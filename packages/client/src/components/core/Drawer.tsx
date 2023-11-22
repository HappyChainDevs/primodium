import React, { useState, createContext, useContext, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "./Button";
import { primodium } from "@game/api";
import { FaTimes } from "react-icons/fa";
import { Card } from "./Card";
import { AudioKeys } from "@game/constants";

interface DrawerContextType {
  isOpen: boolean;
  direction: "left" | "right" | "top" | "bottom";
  setIsOpen: (isOpen: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  direction: "left",
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  setIsOpen: () => {},
});

interface DrawerProps {
  children: ReactNode;
  direction: "left" | "right" | "top" | "bottom";
}

const Drawer: React.FC<DrawerProps> & {
  Button: React.FC<{ children: ReactNode; className?: string }>;
  Content: React.FC<{ children: ReactNode; className?: string }>;
} = ({ children, direction }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { enableInput, disableInput } = primodium.api().input;
  const { audio } = primodium.api();

  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        audio.play(AudioKeys.Sequence2, "ui");
        setIsOpen(false);
      }
    };

    if (isOpen) {
      disableInput();
    } else {
      enableInput();
    }

    window.addEventListener("keydown", handleEscPress);
    return () => {
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [isOpen, disableInput, enableInput, audio]);

  const drawerClasses = `drawer drawer-${direction} ${isOpen ? "open" : ""}`;

  return ReactDOM.createPortal(
    <DrawerContext.Provider value={{ isOpen, setIsOpen, direction }}>
      <div className={drawerClasses} onClick={(e) => e.stopPropagation()}>
        <Card className="drawer-content">{children}</Card>
        <Button className="drawer-close" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </Button>
      </div>
    </DrawerContext.Provider>,
    document.body
  );
};

Drawer.Button = function DrawerButton({ children, className }) {
  const { setIsOpen } = useContext(DrawerContext);

  return (
    <Button className={className} clickSound={AudioKeys.Sequence} onClick={() => setIsOpen(true)}>
      {children}
    </Button>
  );
};

Drawer.Content = function DrawerContent({ children, className }) {
  const { isOpen } = useContext(DrawerContext);

  if (!isOpen) return null;

  return <div className={`drawer-content ${className}`}>{children}</div>;
};

export default Drawer;
