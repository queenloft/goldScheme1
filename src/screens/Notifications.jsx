import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, StatusBar, FlatList, Dimensions } from 'react-native';
import {FONTS,FONT_SIZES,SCREEN_HEIGHT,SCREEN_WIDTH,widthPercentageToDP, heightPercentageToDP, COLORS, normalize, CONSTANTS} from '@src/config/index'
import RenderIcon from '@src/components/icon';


// --- Mock Data for the Notification List ---
const notificationsData = [
    {
        id: '1',
        title: 'Payment Successful',
        message: 'Your payment of ₹20,000.00 has been successfully processed.',
        time: '10 mins ago',
        read: false,
    },
    {
        id: '2',
        title: 'New Offer Unlocked!',
        message: 'Congratulations! You have unlocked a special 10% discount on your next purchase.',
        time: '1 hour ago',
        read: false,
    },
    {
        id: '3',
        title: 'Account Security Update',
        message: 'Your MPIN was successfully changed. If you did not make this change, please contact support immediately.',
        time: 'Yesterday',
        read: true,
    },
     {
        id: '4',
        title: 'Scheme Maturity Reminder',
        message: 'Your Swarna Labam scheme is maturing in 7 days. Plan your next investment!',
        time: '3 days ago',
        read: true,
    },
    {
        id: '5',
        title: 'Welcome to the App!',
        message: 'Thank you for joining us. We are excited to have you on board.',
        time: '1 week ago',
        read: true,
    },
];

// --- Reusable Notification Item Component ---
const NotificationItem = ({ item }) => (
    <Pressable style={styles.notificationCard}>
        {!item.read && <View style={styles.unreadDot} />}
        <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
    </Pressable>
);


// --- The Main Screen Component ---
const NotificationScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />

            {/* Custom Header */}
            <View style={styles.header}>
                <Pressable style={styles.backButton}>
                     <RenderIcon
                        name="arrow-back"
                        size={24}
                        color={COLORS.secondary}
                        onPress={() => navigation.goBack()}
                    />
                </Pressable>
                <Text style={styles.screenTitle}>Notifications</Text>
                <View style={{ width: widthPercentageToDP('8%') }} /> 
            </View>

            {/* Main Content Area */}
            <FlatList
                data={notificationsData}
                renderItem={({ item }) => <NotificationItem item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

// --- Stylesheet using the provided responsive helpers ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.theme,
        paddingTop: heightPercentageToDP('5%'),
        paddingBottom: heightPercentageToDP('1%'),
        paddingHorizontal: widthPercentageToDP('5%'),
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    backButton: {
        padding: 5,
    },
    headerIcon: {
        fontSize: normalize(24),
        color: COLORS.secondary,
        fontFamily: FONTS.PoppinsBold,
    },
    screenTitle: {
        color: COLORS.secondary,
        fontSize: FONT_SIZES.title,
        fontFamily: FONTS.PoppinsBold,
    },
    listContainer: {
        padding: widthPercentageToDP('4%'),
    },
    notificationCard: {
        backgroundColor: COLORS.secondary,
        borderRadius: 12,
        padding: widthPercentageToDP('4%'),
        marginBottom: heightPercentageToDP('1.5%'),
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    unreadDot: {
        width: widthPercentageToDP('2.5%'),
        height: widthPercentageToDP('2.5%'),
        borderRadius: widthPercentageToDP('5.25%'),
        backgroundColor: COLORS.danger,
        marginRight: widthPercentageToDP('3%'),
        marginTop: heightPercentageToDP('0.5%'),
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: FONT_SIZES.body,
        fontFamily: FONTS.PoppinsSemiBold,
        color: COLORS.text,
        marginBottom: heightPercentageToDP('0.5%'),
    },
    notificationMessage: {
        fontSize: FONT_SIZES.caption,
        fontFamily: FONTS.PoppinsRegular,
        color: COLORS.textSecondary,
        lineHeight: normalize(20),
        marginBottom: heightPercentageToDP('1%'),
    },
    notificationTime: {
        fontSize: FONT_SIZES.small,
        fontFamily: FONTS.PoppinsRegular,
        color: COLORS.textSecondary,
        textAlign: 'right',
    },
});

export default NotificationScreen;
