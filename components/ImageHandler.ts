import PR from '../assets/images/PR.json';
import DL from '../assets/images/DL.json';
import TV from '../assets/images/TV.json';

// Load translation.json
import translationData from '../assets/db/en/translation.json';

// Function to map image names to actual image data
function mapImageNamesToData(menuItem: { label: string, page: string, color: string, image: string }): { label: string, page: string, color: string, image: string } {
  switch (menuItem.image) {
    case 'DL':
      return { ...menuItem, image: DL.image };
    case 'PR':
      return { ...menuItem, image: PR.image };
    case 'TV':
      return { ...menuItem, image: TV.image };
    default:
      return { ...menuItem, image: '' };
  }
}

// Apply the mapping to each menu item
const menuContentWithImages = translationData.menuContent.map(mapImageNamesToData);

export const jsonData = { "menuContent": menuContentWithImages };

