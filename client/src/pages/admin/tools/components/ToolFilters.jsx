import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const ToolFilters = ({
  search,
  status,
  category,
  statuses,
  categories,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onReset,
}) => {
  const hasActiveFilters =
    search.trim() !== "" || status !== "all" || category !== "all";

  return (
    <Card title="Filters">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Search"
          placeholder="Search by name, slug or description"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Select
          label="Status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="all">All Statuses</option>
          {statuses.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Select
          label="Category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <div className="flex items-end">
          <Button
            variant="secondary"
            onClick={onReset}
            disabled={!hasActiveFilters}
          >
            <Icon name="close" size={16} />
            Clear Filters
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ToolFilters;
