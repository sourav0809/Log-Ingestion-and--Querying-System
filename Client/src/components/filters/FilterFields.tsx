const FilterField: React.FC<{
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}> = ({ icon, label, children }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium">
      <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      {label}
    </label>
    {children}
  </div>
);

export default FilterField;
