export const FETCH_SLIDER_DATA = 'FETCH_SLIDER_DATA';

export interface SliderItem {
  image: string;
  title: string;
  descr: string;
}

export interface SliderData {
  items: SliderItem[];
}

export interface FetchSliderDataAction {
  type: typeof FETCH_SLIDER_DATA;
  payload: SliderData;
}

export const fetchSliderData = () => (dispatch: (action: FetchSliderDataAction) => void) => {
  const data: SliderData = {
    items: [
      {
        image:
          'https://cdn2.unrealengine.com/egs-lego-horizon-adventures-carousel-desktop-1920x1080-87c66bdf6f10.jpg?resize=1&w=1280&h=720&quality=medium',
        title: 'Lego Horizon Adventures',
        descr:
          'Spends her days observing you from the shadows, sharpening her claws and weaving elaborate plans to murder you.',
      },
      {
        image:
          'https://cdn2.unrealengine.com/en-epic-savings-november-desktop-carousel-asset-4ede9f26219f.avif?resize=1&w=1280&h=720&quality=medium',
        title: 'Epic Savings',
        descr:
          'Unseen, unheard, this highly skilled hunter never misses. Birds, mice, no small critter is safe when she is around.',
      },
      {
        image:
          'https://cdn2.unrealengine.com/egs-path-of-exile-2-cover-story-carousel-desktop-1920x1080-c1846828dfec.jpg?resize=1&w=1280&h=720&quality=medium',
        title: 'Path of Exile 2',
        descr:
          'Long past the stage where you cannot leave any footwear out - this little asshole has become extra sneaky and learned how to open the closet door.',
      },
      {
        image:
          'https://cdn2.unrealengine.com/egs-ea-fc-25-ultimate-carousel-desktop-2-1248x702-ff44b8f5a37a.jpg?resize=1&w=1280&h=720&quality=medium',
        title: 'EA SPORTS FC™ 25 Ultimate Edition',
        descr:
          'This highly skilled predator has no equal in its natural environment and is a menace to all it encounters.',
      },
      {
        image:
          'https://cdn2.unrealengine.com/egs-wuthering-waves-1-4-breaker-1920x1080-cbbb32ebb089.jpg?resize=1&w=1280&h=720&quality=medium',
        title: 'Wuthering Waves',
        descr:
          'Long past the stage where you cannot leave any footwear out - this little asshole has become extra sneaky and learned how to open the closet door.',
      },
    ],
  };

  dispatch({
    type: FETCH_SLIDER_DATA,
    payload: data,
  });
};
