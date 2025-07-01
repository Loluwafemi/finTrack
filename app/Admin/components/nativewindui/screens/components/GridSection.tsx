import React from "react";
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";

interface GridSectionProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  span?: number;
  className?: string;
  style?: ViewStyle;
  minItemWidth?: number;
  responsive?: boolean;
  alignment?: 'start' | 'center' | 'end' | 'stretch';
}

/**
 * Enhanced GridSection component with modern spacing and responsive design
 * Inspired by modern e-commerce and dashboard design patterns
 *
 * @param children - Child components to render in the grid
 * @param columns - Number of columns in the grid (default: 2)
 * @param gap - Gap between grid items in pixels (default: 16)
 * @param span - Not directly applicable in RN but kept for API compatibility
 * @param className - Optional className for styling with NativeWind
 * @param style - Additional ViewStyle properties
 * @param minItemWidth - Minimum width for grid items (enables responsive behavior)
 * @param responsive - Enable responsive column adjustment (default: true)
 * @param alignment - Alignment of grid items (default: 'stretch')
 */
export const GridSection: React.FC<GridSectionProps> = ({
  children,
  columns = 2,
  gap = 16,
  span,
  className = "",
  style = {},
  minItemWidth = 200,
  responsive = true,
  alignment = 'stretch',
}) => {
  // Get screen dimensions for responsive behavior
  const screenWidth = Dimensions.get('window').width;
  
  // Calculate responsive columns based on screen width and minimum item width
  const getResponsiveColumns = () => {
    if (!responsive) return columns;
    
    // Account for padding and gaps
    const availableWidth = screenWidth - 64; // 32px padding on each side
    const itemWidthWithGap = minItemWidth + gap;
    const maxPossibleColumns = Math.floor(availableWidth / itemWidthWithGap);
    
    // Return the smaller of requested columns or what fits
    return Math.min(columns, Math.max(1, maxPossibleColumns));
  };
  
  const effectiveColumns = getResponsiveColumns();
  
  // Convert children to array for manipulation
  const childrenArray = React.Children.toArray(children);

  // Create rows based on effective number of columns
  const rows = [];
  for (let i = 0; i < childrenArray.length; i += effectiveColumns) {
    rows.push(childrenArray.slice(i, i + effectiveColumns));
  }
  
  // Get alignment styles
  const getAlignmentStyle = () => {
    switch (alignment) {
      case 'start': return { alignItems: 'flex-start' as const };
      case 'center': return { alignItems: 'center' as const };
      case 'end': return { alignItems: 'flex-end' as const };
      case 'stretch': return { alignItems: 'stretch' as const };
      default: return { alignItems: 'stretch' as const };
    }
  };

  return (
    <View className={className} style={[styles.container, style]}>
      {rows.map((row, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={[
            styles.row,
            getAlignmentStyle(),
            { 
              marginBottom: rowIndex < rows.length - 1 ? gap : 0,
              gap: gap, // Modern gap property for consistent spacing
            },
          ]}
        >
          {row.map((child, colIndex) => (
            <View
              key={`col-${rowIndex}-${colIndex}`}
              style={[
                styles.column,
                {
                  flex: 1,
                  minWidth: responsive ? minItemWidth : undefined,
                },
              ]}
            >
              {child}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // Modern container with subtle improvements
  },
  row: {
    flexDirection: "row",
    width: "100%",
    // Enhanced row styling for better visual hierarchy
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    // Improved column styling with modern spacing
    minHeight: 0, // Prevents flex item overflow
  },
});

//                       <View>
// export type GridAlignment = 'start' | 'center' | 'end' | 'stretch';
//                       </View>

export default GridSection;
export type { GridSectionProps };

