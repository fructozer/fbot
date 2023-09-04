import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    let sessionid = cookies.get('sessionid');
    if (sessionid == null) {
        sessionid = uuidv4();
        cookies.set('sessionid', sessionid);
    }
    return {
        cookie_id: sessionid
    };
  };
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }