export const FETCH_MENU_DATA = 'SET_MENU_DATA';

export interface MenuItem {
  name: string;
  image?: string;
}

export interface MenuData {
  play: MenuItem[];
  discover: MenuItem[];
  create: MenuItem[];
  distribute: MenuItem[];
}

export interface FetchMenuDataAction {
  type: typeof FETCH_MENU_DATA;
  payload: MenuData;
}

export const fetchMenuData = () => (dispatch: (action: FetchMenuDataAction) => void) => {
  const data: MenuData = {
    play: [
      { name: 'Fortnite', image: 'https://cms-assets.unrealengine.com/gdXF6wXaRzq7FLerxFmv' },
      { name: 'Rocket League', image: 'https://cms-assets.unrealengine.com/nvjfw8LwTbyiETLiJEeE' },
      { name: 'Fall Guys', image: 'https://cms-assets.unrealengine.com/1MdipiMMQeSDZe15gy3V' },
    ],
    discover: [
      { name: 'Epic Games Store', image: 'https://cms-assets.unrealengine.com/aChpm2RFQ3k8uQWWVwgM' },
      { name: 'Fab', image: 'https://cms-assets.unrealengine.com/VYHbV8mMQhCzjH0TIGVO' },
      { name: 'Sketchfab', image: 'https://cms-assets.unrealengine.com/SueHxUd6SFy59VZItanD' },
      { name: 'ArtStation', image: 'https://cms-assets.unrealengine.com/GnVa6hUTtSLOfMZrWNxe' },
    ],
    create: [
      { name: 'Unreal Engine', image: 'https://cms-assets.unrealengine.com/B8hDILAISampfm5yFOQA' },
      { name: 'Create in Fortnite', image: 'https://cms-assets.unrealengine.com/gdXF6wXaRzq7FLerxFmv' },
      { name: 'MetaHuman', image: 'https://cms-assets.unrealengine.com/E3A9GiKvTxe0vldk0b7T' },
      { name: 'Twinmotion', image: 'https://cms-assets.unrealengine.com/bx1K2n3URsKKIismuqzF' },
      { name: 'RealityScan', image: 'https://cms-assets.unrealengine.com/fBKKKvETTG2PSGTs19a9' },
      { name: 'RealityCapture', image: 'https://cms-assets.unrealengine.com/4hsNBIcXQcCzsN0FYLfD' },
      { name: 'Epic Online Services', image: 'https://cms-assets.unrealengine.com/aChpm2RFQ3k8uQWWVwgM' },
      { name: 'Publish on Epic Games Store', image: 'https://cms-assets.unrealengine.com/aChpm2RFQ3k8uQWWVwgM' },
      { name: 'Kids Web Services', image: 'https://cms-assets.unrealengine.com/ijWMz82OStqcWRGDawM9' },
      { name: 'Developer Community', image: 'https://cms-assets.unrealengine.com/aChpm2RFQ3k8uQWWVwgM' },
    ],
    distribute: [
      { name: 'Distribute on Epic Games Store' },
      { name: 'Developer Forums' },
      { name: 'Documentation' },
      { name: 'Learning' },
    ],
  };

  dispatch({
    type: FETCH_MENU_DATA,
    payload: data,
  });
};
