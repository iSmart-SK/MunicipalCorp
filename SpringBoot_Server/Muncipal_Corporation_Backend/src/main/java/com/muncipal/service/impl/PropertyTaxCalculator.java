package com.muncipal.service.impl;

public class PropertyTaxCalculator {

    private static final double BASE_RATE = 10.0; // ₹ per sq.ft per year

    public static double calculateTax(
            int occupiedArea,
            String category,
            String usageType
    ) {

        double usageFactor = getUsageFactor(category, usageType);

        return occupiedArea * BASE_RATE * usageFactor;
    }

    // ----------------- FACTOR LOGIC -----------------

    private static double getUsageFactor(String category, String usageType) {

        category = category.toUpperCase();
        usageType = usageType.toUpperCase();

        switch (category) {

            case "RESIDENTIAL":
                if (usageType.equals("SELF_OCCUPIED")) return 1.0;
                if (usageType.equals("RENTED")) return 1.25;
                break;

            case "COMMERCIAL":
                switch (usageType) {
                    case "SHOP": return 1.6;
                    case "WAREHOUSE": return 1.4;
                    case "OFFICE": return 1.8;
                    case "HOTEL": return 2.3;
                    case "RESTAURANT": return 2.1;
                    case "FACTORY": return 2.0;
                    case "OTHERS": return 2.4;
                }
                break;

            case "MIXED":
                // Mixed handled separately using area split
                return 1.0;
        }

        return 1.0; // default safe value
    }
}

