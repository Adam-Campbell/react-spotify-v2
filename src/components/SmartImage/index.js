import { SmartImage } from './SmartImage';
import './smartImage.scss';

/*

Image component with a fallback image used whenever an image url isn't available to be used. 

When first mounting it only shows the fallback image, it immediately begins loading the actual image into
memory, and then displays the actual image once it has finished loading.

*/

export default SmartImage;