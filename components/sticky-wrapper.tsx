type Props = {
  children: React.ReactNode;
};

export const StickyWrapper = ({ children }: Props) => {
  return (
    <div className=" hidden lg:block w-[368px] sticky self-end bottom-6">
      <div className=" min-h-[calc(100vh-48px)] flex flex-col sticky top-6 gap-y-4">
        {children}
      </div>
    </div>
  );
};
