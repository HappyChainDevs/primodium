export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={`card bg-neutral border border-accent p-2 ${className}`}>
      {children}
    </div>
  );
};

export const SecondaryCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={`card bg-base-100 border-2 border-neutral p-2 ${className}`}
    >
      {children}
    </div>
  );
};
