import { filterType } from "@/lib/data";
import { Badge } from "../components/ui/badge";
import React from "react";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StatsAndFilters = ({
  comleteTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Phần thống kê */}
        <div className="flex gap-3">
          <Badge
            variant="secondary"
            className="bg-white/50 text-accent-foreground border-info/20"
          >
            {activeTasksCount} {filterType.active}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/50 text-accent-foreground border-info/20"
          >
            {comleteTasksCount} {filterType.complete}
          </Badge>
        </div>
        {/* Phần lọc */}
        <div className="flex flex-col gap-2 sm:flex-row">
          {Object.keys(filterType).map((type) => (
            <Button
              key={type}
              variant={filter === type ? "gradient" : "ghost"}
              size="sm"
              className="capitalize"
              onClick={() => setFilter(type)}
            >
              <Filter className="size-4" />
              {filterType[type]}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default StatsAndFilters;
