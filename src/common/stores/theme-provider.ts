import { create } from 'zustand';
import img0 from '@/assets/images/backgroundImage0.jpg';
import img1 from '@/assets/images/backgroundImage1.jpg';
import img2 from '@/assets/images/backgroundImage2.jpg';
import img3 from '@/assets/images/backgroundImage3.jpg';

type State = {
  locale: string;
  theme: {
    primaryColor: string;
    background: string;
    backgroundImage: string | null;
    backgroundImageOption: A[];
  };
};

type Actions = {
  changeBackgroundColor: (color: string) => void;
  changeBackgroundImage: (image: string | null) => void;
};

const useThemeProviderStore = create<State & Actions>((set) => ({
  locale: 'en-US',
  theme: {
    primaryColor: '#1DA57A',
    background: '#2db48a3b',
    backgroundImage: '',
    backgroundImageOption: [img0, img1, img2, img3],
  },
  changeBackgroundColor: (color: string) =>
    set((state) => ({
      ...state,
      theme: {
        ...state.theme,
        background: color,
      },
    })),
  changeBackgroundImage: (image: string | null) =>
    set((state) => ({
      ...state,
      theme: {
        ...state.theme,
        backgroundImage: image,
      },
    })),
}));

export default useThemeProviderStore;
