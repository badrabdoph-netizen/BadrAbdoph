import * as React from "react";

type EditModeContextValue = {
  /** True when the UI is in inline-edit mode (admin-only components will react). */
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  toggleEditMode: () => void;
};

const EditModeContext = React.createContext<EditModeContextValue | null>(null);

const STORAGE_KEY = "badr.editMode";

export function EditModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editMode, setEditModeState] = React.useState(false);

  // Load initial state from localStorage (client-side only)
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "1") setEditModeState(true);
    } catch {
      // ignore
    }
  }, []);

  const setEditMode = React.useCallback((value: boolean) => {
    setEditModeState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    } catch {
      // ignore
    }
  }, []);

  const toggleEditMode = React.useCallback(() => {
    setEditMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = React.useMemo<EditModeContextValue>(
    () => ({ editMode, setEditMode, toggleEditMode }),
    [editMode, setEditMode, toggleEditMode]
  );

  return (
    <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = React.useContext(EditModeContext);
  if (!ctx) {
    throw new Error("useEditMode must be used within EditModeProvider");
  }
  return ctx;
}
