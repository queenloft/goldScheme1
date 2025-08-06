import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, StatusBar, ScrollView, Dimensions } from 'react-native';
import {FONTS,FONT_SIZES,SCREEN_HEIGHT,SCREEN_WIDTH,widthPercentageToDP, heightPercentageToDP, COLORS, normalize, CONSTANTS} from '@src/config/index'
import RenderIcon from '@src/components/icon';


// --- Mock Data for the Transaction List ---
const transactionsData = [
    {
        id: '1',
        date: '18-Jul-2025',
        amount: '20000.00',
        status: 'SUCCESS',
    },
    {
        id: '2',
        date: '15-Jul-2025',
        amount: '5000.00',
        status: 'SUCCESS',
    },
    {
        id: '3',
        date: '12-Jul-2025',
        amount: '1250.50',
        status: 'PENDING',
    },
     {
        id: '4',
        date: '10-Jul-2025',
        amount: '7800.00',
        status: 'FAILED',
    },
];


// --- The Main Screen Component ---
const TransactionsScreen = ({navigation}) => {
    // State for the dropdown. In a real app, this would filter the list.
    const [paymentStatus, setPaymentStatus] = useState('All');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            {/* Custom Header */}
            <View style={styles.header}>
                <Pressable style={styles.backButton}>
                    {/* Replace with a proper icon */}
                   <RenderIcon
                        name="arrow-back"
                        size={24}
                        color={COLORS.secondary}
                        onPress={() => navigation.goBack()}
                    />
                </Pressable>
                <View>
                    <Text style={styles.headerName}>{CONSTANTS.appName}</Text>
                </View>
                <Text style={styles.headerVersion}></Text>
            </View>

            {/* "My Transactions" Title Bar */}
            <View style={styles.titleBar}>
                <Text style={styles.titleText}>My Transactions</Text>
            </View>

            {/* Main Content Area */}
            <ScrollView style={styles.contentArea} showsVerticalScrollIndicator={false}>
                <Text style={styles.dropdownLabel}>Payment Status</Text>
                {/* This is a styled View to look like a dropdown.
                    For functionality, use a library like 'react-native-picker-select'. */}
                <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>{paymentStatus}</Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                </View>

                {/* Transactions Table */}
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerCell, {flex: 2.5}]}>Date</Text>
                        <Text style={[styles.headerCell, {flex: 2}]}>Amount</Text>
                        <Text style={[styles.headerCell, {flex: 1.5}]}>Status</Text>
                        <Text style={[styles.headerCell, {flex: 1}]}>PDF</Text>
                    </View>

                    {/* Table Body - Mapped from mock data */}
                    {transactionsData.map((item) => (
                         <View key={item.id} style={styles.tableRow}>
                            <Text style={[styles.rowCell, {flex: 2.5}]}>{item.date}</Text>
                            <Text style={[styles.rowCell, {flex: 2}]}>₹ {item.amount}</Text>
                            <Pressable style={[styles.rowCell, styles.iconCell, {flex: 1}]}>
                                {/* Replace with a proper icon */}
                                {/* <Text style={styles.actionIcon}>{item?.status}</Text> */}
                                {
                                    item?.status === 'SUCCESS' ?(
                                        <RenderIcon
                                        name="checkmark-circle-outline"
                                        color={COLORS.success}
                                        size={24}
                                        />
                                    ) : (
                                        <RenderIcon
                                        name="close-circle-outline"
                                        color={COLORS.danger}
                                        size={24}
                                        />
                                    )

                                }
                            </Pressable>
                            <Pressable style={[styles.rowCell, styles.iconCell, {flex: 1}]}>
                                 {/* Replace with a proper icon */}
                                <RenderIcon
                                 name={"cloud-download-outline"}
                                 color={COLORS.primaryDark}
                                 size={24}
                                />
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

// --- Stylesheet using the provided responsive helpers ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.theme,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: heightPercentageToDP('5%'),
        paddingBottom: heightPercentageToDP('2%'),
        paddingHorizontal: widthPercentageToDP('5%'),
    },
    backButton: {
        padding: 5,
    },
    headerIcon: {
        fontSize: normalize(24),
        color: COLORS.secondary,
        fontFamily: FONTS.PoppinsBold,
    },
    logo: {
        width: widthPercentageToDP('8%'),
        height: widthPercentageToDP('8%'),
        alignSelf: 'center',
        marginBottom: 5,
    },
    headerName: {
        color: COLORS.secondary,
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.PoppinsMedium,
    },
    headerVersion: {
        color: COLORS.secondary,
        fontSize: FONT_SIZES.caption,
        fontFamily: FONTS.PoppinsRegular,
    },
    titleBar: {
        backgroundColor: COLORS.primary,
        paddingVertical: heightPercentageToDP('1.3%'),
        marginHorizontal: widthPercentageToDP('4%'),
        borderRadius: 15,
        alignItems: 'center',
        zIndex: 10,
        elevation:10
    },
    titleText: {
        color: COLORS.primaryDark,
        fontSize: FONT_SIZES.body,
        fontFamily: FONTS.PoppinsBold,
    },
    contentArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
        marginTop: -heightPercentageToDP('1.5%'),
        paddingTop: heightPercentageToDP('4%'),
        paddingHorizontal: widthPercentageToDP('4%'),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    dropdownLabel: {
        fontSize: FONT_SIZES.body,
        fontFamily: FONTS.PoppinsMedium,
        color: COLORS.textSecondary,
        marginBottom: heightPercentageToDP('1%'),
        marginLeft: widthPercentageToDP('2%'),
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: widthPercentageToDP('4%'),
        paddingVertical: heightPercentageToDP('1.3%'),
        marginBottom: heightPercentageToDP('3%'),
    },
    dropdownText: {
        fontSize: FONT_SIZES.body,
        fontFamily: FONTS.PoppinsSemiBold,
        color: COLORS.text,
    },
    dropdownArrow: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
    },
    table: {
        borderWidth: 1,
        borderColor: '#DEE2E6',
        borderRadius: 12,
        backgroundColor: COLORS.secondary,
        overflow: 'hidden', // Ensures inner rows follow the border radius
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FA',
        borderBottomWidth: 1,
        borderBottomColor: '#DEE2E6',
    },
    headerCell: {
        padding: widthPercentageToDP('3%'),
        color: COLORS.text,
        fontFamily: FONTS.PoppinsBold,
        fontSize: FONT_SIZES.caption,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
    },
    rowCell: {
        paddingVertical: heightPercentageToDP('2%'),
        paddingHorizontal: widthPercentageToDP('2%'),
        fontFamily: FONTS.PoppinsRegular,
        fontSize: FONT_SIZES.caption,
        color: COLORS.text,
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#E9ECEF',
    },
    iconCell: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionIcon: {
        fontSize: normalize(20),
    },
});

export default TransactionsScreen;
