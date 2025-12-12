const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// On write to so_items: update invoices mapping (sample)
exports.onSoItemsWrite = functions.firestore
  .document('so_items/{soItemId}')
  .onWrite(async (change, context) => {
    const after = change.after.exists ? change.after.data() : null;
    const before = change.before.exists ? change.before.data() : null;
    if(!after) return null;

    const { so, color, size, tracers = [], invoice_list = [] } = after;
    // If invoice_list present, ensure invoices docs contain tracer array
    const db = admin.firestore();
    try {
      for(const inv of invoice_list){
        const invRef = db.collection('invoices').doc(inv);
        await db.runTransaction(async (t) => {
          const s = await t.get(invRef);
          let current = s.exists ? s.data().tracers || [] : [];
          const set = new Set([...current, ...tracers]);
          t.set(invRef, { invoice: inv, tracers: Array.from(set), so_list: admin.firestore.FieldValue.arrayUnion(so) }, { merge: true });
        });
      }
    } catch(err){
      console.error('Error updating invoices:', err);
    }
    return null;
  });
