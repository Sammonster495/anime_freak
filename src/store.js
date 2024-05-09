import {create} from 'zustand';

export const useProfileStore = create((set) => ({
  data: null,
  setData: (data) => set(() => ({ data: data })),
}))

export const useFilterStore = create((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));

export const useGenreStore = create((set) => ({
  fgenre: {}, 
  defaultState: () => set(() => {
    const updatedGenre = {};
    for (let i = 1; i <= 22; i++) {
      updatedGenre[i] = false;
    }
    return { fgenre: updatedGenre };
  }),
  update: (id) => set((state) => {
    const updatedGenre = { ...state.fgenre, [id]: !state.fgenre[id] };
    return { fgenre: updatedGenre };
  }),
}));
