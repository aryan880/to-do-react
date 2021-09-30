// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { listStateTypes } from 'app/pages/HomePage/components/List/slice/types';
import { homePageTypes } from 'app/pages/HomePage/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  listPage?: listStateTypes;
  homePage?: homePageTypes;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
