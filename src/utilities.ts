import { useLocalStorage } from "@yamori-shared/react-utilities";

export type SavedQr = {
  text: string;
  date: number;
};

export function useSavedQrs() {
  return useLocalStorage<SavedQr[]>("@qr:saved-qrs");
}
