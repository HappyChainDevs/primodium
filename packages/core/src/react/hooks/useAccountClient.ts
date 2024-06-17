import { AccountClientContext } from "@/react/hooks/providers/AccountClientProvider";
import { useContext } from "react";

/**
 * Teturns the account client from the AccountClientContext.
 *
 * @returns The account client from the AccountClientContext.
 * @throws {Error} If used outside of an AccountProvider.
 */
export const useAccountClient = () => {
  const context = useContext(AccountClientContext);
  if (!context) {
    throw new Error("useAccountClientContext must be used within an AccountProvider");
  }
  return context;
};
