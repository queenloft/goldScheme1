import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, StatusBar, ScrollView, TextInput, Dimensions } from 'react-native';
import {FONTS,FONT_SIZES,SCREEN_HEIGHT,SCREEN_WIDTH,widthPercentageToDP, heightPercentageToDP, COLORS, normalize, CONSTANTS} from '@src/config/index'
import RenderIcon from '@src/components/icon';



// --- Reusable Info Row Component ---
const InfoRow = ({ label, value, valueStyle }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, valueStyle]}>{value}</Text>
    </View>
);


// --- The Main Screen Component ---
const PaymentScreen = ({navigation}) => {
    const [payAmount, setPayAmount] = useState('0.00');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />

            {/* Custom Header */}
            <View style={styles.header}>

                     <RenderIcon
                        name="arrow-back"
                        size={24}
                        color={COLORS.secondary}
                        onPress={() => navigation.goBack()}
                    />

                    <Text style={styles.headerName}>{CONSTANTS.appName}</Text>

                <Text style={styles.headerVersion}>AV: 1.7.0</Text>
            </View>

            {/* "Monthly Entry" Title Bar */}
            <View style={styles.titleBar}>
                <Text style={styles.titleText}>Monthly Entry</Text>
            </View>

            {/* Main Content Area */}
            <ScrollView style={styles.contentArea} contentContainerStyle={styles.contentContainer}>

                {/* Pay Amount Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Pay Amount</Text>
                    <TextInput
                        style={styles.input}
                        value={payAmount}
                        onChangeText={setPayAmount}
                        keyboardType="numeric"
                        placeholder="0.00"
                        placeholderTextColor={COLORS.theme}
                    />
                </View>

                {/* Scheme Details */}
                <View style={styles.detailsContainer}>
                    <InfoRow label="Group Code" value="AM" />
                    <InfoRow label="Membership No." value="74" />
                    <InfoRow label="Maturity Date" value="13-Jun-2026" />
                    <InfoRow label="Instalment" value="1 / 12" />
                    <InfoRow label="Discount Rate" value="9190.00 /-" />
                    <InfoRow
                        label="Approx Weight"
                        value="0.000 Grms."
                        valueStyle={{ color: COLORS.approxWeightGreen, fontFamily: FONTS.PoppinsSemiBold }}
                    />
                </View>

                {/* Pay Now Button */}
                <Pressable style={styles.payButton}>
                    <Text style={styles.payButtonText}>PAY NOW</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

// --- Stylesheet ---
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
        fontSize: FONT_SIZES.caption,
        fontFamily: FONTS.PoppinsMedium,
    },
    headerVersion: {
        color: COLORS.secondary,
        fontSize: FONT_SIZES.caption,
        fontFamily: FONTS.PoppinsRegular,
    },
    titleBar: {
        backgroundColor: COLORS.primary,
        paddingVertical: heightPercentageToDP('2%'),
        marginHorizontal: widthPercentageToDP('4%'),
        borderRadius: 15,
        alignItems: 'center',
        zIndex: 10,
        elevation:10
    },
    titleText: {
        color: COLORS.primaryDark,
        fontSize: FONT_SIZES.title,
        fontFamily: FONTS.PoppinsBold,
    },
    contentArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
        marginTop: -heightPercentageToDP('3.5%'),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    contentContainer: {
        paddingHorizontal: widthPercentageToDP('6%'),
        alignItems: 'center',
        paddingVertical:heightPercentageToDP('7%')
    },
    schemeTitle: {
        fontSize: FONT_SIZES.subtitle,
        fontFamily: FONTS.PoppinsSemiBold,
        color: COLORS.text,
        marginBottom: heightPercentageToDP('2%'),
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: heightPercentageToDP('4%'),
    },
    inputLabel: {
        fontSize: FONT_SIZES.body,
        fontFamily: FONTS.PoppinsRegular,
        color: COLORS.textSecondary,
        marginBottom: heightPercentageToDP('1%'),
    },
    input: {
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        width: '60%',
        padding: heightPercentageToDP('1.5%'),
        textAlign: 'center',
        fontSize: FONT_SIZES.body,
        fontFamily: FONTS.PoppinsMedium,
        color: COLORS.text,
    },
    detailsContainer: {
        width: '100%',
        marginBottom: heightPercentageToDP('5%'),
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: heightPercentageToDP('1.8%'),
    },
    infoLabel: {
        fontSize: FONT_SIZES.body,
        fontFamily: FONTS.PoppinsRegular,
        color: COLORS.text,
    },
    infoValue: {
        fontSize: FONT_SIZES.body,
        fontFamily: FONTS.PoppinsSemiBold,
        color: COLORS.text,
    },
    payButton: {
        backgroundColor: COLORS.theme,
        width: '100%',
        paddingVertical: heightPercentageToDP('2%'),
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    payButtonText: {
        color: COLORS.secondary,
        fontSize: FONT_SIZES.subtitle,
        fontFamily: FONTS.PoppinsBold,
    },
});

export default PaymentScreen;
