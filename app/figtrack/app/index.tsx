import { router } from 'expo-router';
import { Platform, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef } from 'react';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { Icon } from '@roninoss/icons';
import { useColorScheme } from '~/lib/useColorScheme';
import { globalStyles } from '~/theme/styles';
import { CUSTOM_BRAND_COLORS } from '~/theme/colors';

const { width } = Dimensions.get('window');

const onboardingPages = [
  {
    title: "Smart Financial Tracking",
    subtitle: "Monitor your expenses, income, and financial goals with intelligent categorization and real-time insights.",
    features: [
      { icon: "chart-pie" as const, title: "Advanced Analytics", description: "Get detailed insights into your spending patterns with interactive charts and reports" },
      { icon: "credit-card-outline" as const, title: "Expense Tracking", description: "Automatically categorize transactions and track expenses across multiple accounts" },
      { icon: "target" as const, title: "Goal Setting", description: "Set and monitor financial goals with progress tracking and milestone alerts" }
    ]
  },
  {
    title: "Secure & Private",
    subtitle: "Your financial data is protected with bank-level security and end-to-end encryption.",
    features: [
      { icon: "shield-check-outline" as const, title: "Bank-Level Security", description: "256-bit SSL encryption ensures your data is always protected and secure" },
      { icon: "lock-outline" as const, title: "Privacy First", description: "Your personal information stays private - we never sell or share your data" },
      { icon: "fingerprint" as const, title: "Biometric Access", description: "Secure app access with fingerprint, face ID, or PIN protection" }
    ]
  },
  {
    title: "Intelligent Insights",
    subtitle: "Make informed financial decisions with AI-powered recommendations and predictive analytics.",
    features: [
      { icon: "lightbulb-outline" as const, title: "AI Recommendations", description: "Get personalized suggestions to optimize your spending and savings" },
      { icon: "trending-up" as const, title: "Predictive Analytics", description: "Forecast future expenses and income based on your historical data" },
      { icon: "bell-outline" as const, title: "Smart Alerts", description: "Receive notifications for unusual spending, bill reminders, and budget limits" }
    ]
  }
] as const;

export default function WelcomeConsentScreen() {
  const { colors } = useColorScheme();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: CUSTOM_BRAND_COLORS.majorBackground }]}>
      <View style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 32,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
     
        {/* Content Section */}
        <View style={{
          flex: 1,
          width: '100%',
        }}>
          {/* Swipeable Content Pages */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentPage(pageIndex);
            }}
            style={{
              marginBottom: 32,
            }}
            contentContainerStyle={{
              paddingHorizontal: 0,
            }}
          >
            {onboardingPages.map((page, index) => (
              <View key={index} style={{
                width: width,
                paddingHorizontal: 20,
              }}>
                {/* Page Title */}
                <Text style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: colors.text,
                  marginBottom: 16,
                  lineHeight: 38,
                }}>
                  {page.title}
                </Text>

                {/* Page Subtitle */}
                <Text style={{
                  fontSize: 16,
                  textAlign: 'center',
                  color: colors.text,
                  opacity: 0.6,
                  marginBottom: 24,
                  lineHeight: 24,
                  paddingHorizontal: 4,
                }}>
                  {page.subtitle}
                </Text>

                {/* Features List */}
                <View style={{ marginBottom: 12 }}>
                  {page.features.map((feature, featureIndex) => (
                    <View key={featureIndex} style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginBottom: 16,
                      paddingHorizontal: 4,
                    }}>
                      <View style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: CUSTOM_BRAND_COLORS.accent,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 16,
                        marginTop: 2,
                      }}>
                        <Icon
                           name={feature.icon}
                           size={22}
                           color={CUSTOM_BRAND_COLORS.white}
                         />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: colors.text,
                          marginBottom: 6,
                          lineHeight: 22,
                        }}>
                          {feature.title}
                        </Text>
                        <Text style={{
                          fontSize: 14,
                          color: colors.text,
                          opacity: 0.7,
                          lineHeight: 20,
                        }}>
                          {feature.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Action Buttons */}
          <View style={{
            flexDirection: 'row',
            gap: 16,
            marginBottom: 24,
            paddingHorizontal: 24,
          }}>
            {/* Sign Up Button */}
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: CUSTOM_BRAND_COLORS.accent,
                paddingVertical: 16,
                borderRadius: 25,
                alignItems: 'center',
                shadowColor: CUSTOM_BRAND_COLORS.accent,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
              onPress={() => router.push('/(auth)/signup')}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
              }}>
                Sign up
              </Text>
            </TouchableOpacity>

            {/* Sign In Button */}
             <TouchableOpacity
               style={{
                 flex: 1,
                 backgroundColor: 'transparent',
                 paddingVertical: 16,
                 borderRadius: 25,
                 alignItems: 'center',
                 borderWidth: 1,
                 borderColor: colors.text,
               }}
               onPress={() => router.push('/(dashboard)')}
             >
              <Text style={{
                color: colors.text,
                fontSize: 16,
                fontWeight: '600',
              }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

          {/* Progress Indicator */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}>
            {onboardingPages.map((_, index) => (
              <View
                key={index}
                style={{
                  width: currentPage === index ? 24 : 8,
                  height: 4,
                  backgroundColor: currentPage === index ? CUSTOM_BRAND_COLORS.accent : colors.text,
                  opacity: currentPage === index ? 1 : 0.3,
                  borderRadius: 2,
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const FEATURES = [
  {
    title: 'Finance Tracking',
    description: 'Easily record, categorize, and monitor all your income and expenses.',
    icon: 'account-circle-outline',
  },
  {
    title: 'Finance and Grant Analysis',
    description: 'Visualize trends, compare budget allocations, and assess grant performance with powerful analytics tools.',
    icon: 'grid',
  },
  {
    title: 'Activity Tracking',
    description: 'We prioritize your security. All financial and grant records are encrypted and backed up with industry-standard protocols.',
    icon: 'chart-timeline-variant',
  },
] as const;
