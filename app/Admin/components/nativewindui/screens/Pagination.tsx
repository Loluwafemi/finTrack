import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  label?: string;
}

// Responsive breakpoints: mobile <640px, tablet 640–1024px, desktop >1024px
// Max 20 entries per page, pages auto-calculate from totalItems
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  onPageChange,
  itemsPerPage = 20,
  label
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  // Only show up to 5 page buttons for better UX
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };
  const pages = getPageNumbers();

  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white border-t border-gray-300">
      <Text className="text-sm text-black">
        {label ? label : `Displaying ${start}-${end} of ${totalItems} accounts`}
      </Text>
      <View className="flex-row gap-1">
        <TouchableOpacity
          className="px-4 py-2 border border-black rounded-md text-sm text-black bg-white"
          disabled={currentPage === 1}
          onPress={() => onPageChange(currentPage - 1)}
        >
          <Text className="text-sm font-medium">Previous</Text>
        </TouchableOpacity>
        {pages.map((page, idx) =>
          typeof page === 'number' ? (
            <TouchableOpacity
              key={page}
              className={
                page === currentPage
                  ? "px-3 py-2 bg-black text-white rounded-md text-sm"
                  : "px-3 py-2 border border-black rounded-md text-sm text-black bg-white"
              }
              onPress={() => onPageChange(page)}
              disabled={page === currentPage}
            >
              <Text className={page === currentPage ? "text-sm font-medium text-white" : "text-sm font-medium"}>{page}</Text>
            </TouchableOpacity>
          ) : (
            <Text key={"ellipsis-" + idx} className="px-2 py-2 text-black text-sm">...</Text>
          )
        )}
        <TouchableOpacity
          className="px-4 py-2 border border-black rounded-md text-sm text-black bg-white"
          disabled={currentPage === totalPages}
          onPress={() => onPageChange(currentPage + 1)}
        >
          <Text className="text-sm font-medium">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
