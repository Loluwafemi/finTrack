# FigTrack Theme System

This directory contains the complete theming system for the FigTrack app, featuring a custom brand color palette designed for a modern, professional financial tracking experience.

## Color Scheme

Our custom brand colors follow a carefully designed hierarchy:

- **#222831** (20%) - Cards, subcards, component backgrounds
- **#393E46** (40%) - Major backgrounds
- **#00ADB5** (30%) - Special text (bold, notifications, titles) and graphs
- **#EEEEEE** (10%) - Normal text and icons
- **#CF0F47** (Special) - Warnings and alerts

## Files Structure

### `colors.ts`
Defines the core color palette and theme variants (light/dark modes).

### `styles.ts`
Provides reusable StyleSheet objects for consistent styling across the app.

### `index.ts`
Central export file for easy importing of all theme utilities.

## Usage Examples

### Basic Import
```typescript
import { CUSTOM_BRAND_COLORS, globalStyles, textStyles } from '../theme';
```

### Using Global Styles
```typescript
// Container with brand background
<View style={globalStyles.container}>
  {/* Card with brand styling */}
  <View style={globalStyles.card}>
    <Text style={textStyles.title}>Financial Overview</Text>
    <Text style={textStyles.body}>Your account balance</Text>
  </View>
</View>
```

### Using Text Styles
```typescript
// Different text hierarchies
<Text style={textStyles.title}>Main Title</Text>
<Text style={textStyles.subtitle}>Section Header</Text>
<Text style={textStyles.body}>Regular content</Text>
<Text style={textStyles.notification}>Important notification</Text>
<Text style={textStyles.warning}>Warning message</Text>
```

### Using Button Styles
```typescript
// Primary action button
<TouchableOpacity style={buttonStyles.primary}>
  <Text style={buttonStyles.primaryText}>Save Changes</Text>
</TouchableOpacity>

// Secondary button
<TouchableOpacity style={buttonStyles.secondary}>
  <Text style={buttonStyles.secondaryText}>Cancel</Text>
</TouchableOpacity>

// Warning/destructive action
<TouchableOpacity style={buttonStyles.warning}>
  <Text style={buttonStyles.warningText}>Delete Account</Text>
</TouchableOpacity>
```

### Using Input Styles
```typescript
<View style={inputStyles.container}>
  <Text style={inputStyles.label}>Amount</Text>
  <TextInput 
    style={[inputStyles.input, isFocused && inputStyles.inputFocused]}
    placeholder="Enter amount"
    placeholderTextColor="#B8B8B8"
  />
</View>
```

### Using Layout Utilities
```typescript
// Row layout with space between
<View style={[layoutStyles.rowBetween, layoutStyles.padding]}>
  <Text style={textStyles.body}>Total Balance</Text>
  <Text style={textStyles.notification}>$1,234.56</Text>
</View>
```

### Using Shadow Effects
```typescript
// Card with medium shadow
<View style={[globalStyles.card, shadowStyles.medium]}>
  <Text style={textStyles.subtitle}>Transaction History</Text>
</View>
```

### Using Graph Styles
```typescript
// Chart container
<View style={graphStyles.container}>
  <Text style={graphStyles.title}>Monthly Expenses</Text>
  {/* Chart component here */}
</View>
```

### Direct Color Usage
```typescript
// Using brand colors directly
<View style={{
  backgroundColor: CUSTOM_BRAND_COLORS.cardBackground,
  borderColor: CUSTOM_BRAND_COLORS.accent,
  borderWidth: 1
}}>
  <Text style={{ color: CUSTOM_BRAND_COLORS.text }}>
    Custom styled content
  </Text>
</View>
```

## Best Practices

1. **Consistency**: Always use the predefined styles instead of inline styling
2. **Hierarchy**: Follow the text style hierarchy (title > subtitle > body > caption)
3. **Color Usage**: Stick to the percentage guidelines for color distribution
4. **Accessibility**: Ensure sufficient contrast ratios for text readability
5. **Responsive**: Test styles on different screen sizes

## Color Distribution Guidelines

- **Cards/Components (20%)**: Use `CUSTOM_BRAND_COLORS.cardBackground` for cards, modals, and component backgrounds
- **Major Backgrounds (40%)**: Use `CUSTOM_BRAND_COLORS.majorBackground` for screen backgrounds and main containers
- **Special Elements (30%)**: Use `CUSTOM_BRAND_COLORS.accent` for titles, buttons, graphs, and important UI elements
- **Text/Icons (10%)**: Use `CUSTOM_BRAND_COLORS.text` for regular text and icons
- **Alerts/Warnings**: Use `CUSTOM_BRAND_COLORS.warning` sparingly for error states and critical actions

## Migration from Old Colors

The new theme system replaces the old `IOS_SYSTEM_COLORS` and `ANDROID_COLORS` with a unified brand palette. All existing color references should be updated to use the new `CUSTOM_BRAND_COLORS` or the predefined style objects.

## Dark Mode Support

The theme system includes both light and dark variants, automatically adapting to the user's system preferences through the `COLORS` object.