import React, { Component } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import styles from './StatementsScreenStyle'
import PropTypes from 'prop-types'
import RNPickerSelect from 'react-native-picker-select'
import DownArrow from 'App/Assets/Images/Svg/DownArrow'
import RadioButton from 'App/Components/RadioButton/RadioButton'
import DropDownArrow from 'App/Assets/Images/Svg/DropDownArrow'
import { Colors } from 'App/Theme'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { connect } from 'react-redux'
import moment from 'moment'
import TextFormats from 'App/Constants/TextFormats'
import I18n from 'App/Localization/I18n.js'
import TransListItem from 'App/Components/TransListItem/TransListItem'
import UserActions from 'App/Stores/User/Actions'
import WalletActions from 'App/Stores/WalletBalance/Actions'
import DefaultStrings from 'App/Constants/DefaultStrings'
import { TransactionStatus, Months, cryptoStatus } from 'App/Constants/TransactionStatus'
import EmptyListView from 'App/Components/EmptyListView/EmptyListView'

/**
 * Statement screen where user can view statements with filter options
 */
export class StatementsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterByList: [
        { id: 1, label: I18n.t('CUSTOM_TIMEFRAME'), value: I18n.t('CUSTOM_TIMEFRAME') },
        { id: 2, label: I18n.t('YEARLY'), value: I18n.t('YEARLY') },
      ],
      filterByListSelectedValue: '',
      fromDate: this.getDateMonthsBefore(new Date(), 30),
      toDate: new Date(),
      isFromDatePicker: false,
      isToDatePicker: false,
      selectedRadioButton: 0,
      // for early filter list
      transactionList: [],
      selectedListType: 'ALL',
      currentPage: 1,
      totalPages: 0,
      items: 0,
      loadMoreData: false,
      totalTransactions: [],
      isOpen: false,
      selectedIndex: -1,
      selectedYears: [],
      filterByYearSelectedValue: '',
      // for monthly filter list
      selectedMonths: [],
      transactionListMonthWise: [],
      selectedMonth: 0,
      isExtraDataForMonthWise: false,
      transactionDetailMonthWise: {},
      selectedIndexMonthWise: -1,
    }
  }

  /**
   * Intial component to render view
   */
  componentDidMount() {
    const { fromDate, toDate, currentPage } = this.state
    this.setState({
      filterByListSelectedValue: this.state.filterByList[0].value,
    })
    this.getTransactionsList(
      {
        from: moment(fromDate).format(TextFormats.DATE_FORMAT),
        to: moment(toDate).format(TextFormats.DATE_FORMAT),
        page: currentPage,
        items: DefaultStrings.PAGINATION_ITEMS,
      },
      true
    )
    this.calculateYearsAndMonths()
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    if (prevProps.transactionDetail !== this.props.transactionDetail) {
      this.setState({ isOpen: true })
      this.statementsFlatListRef.scrollToIndex({ animated: true, index: this.state.selectedIndex })
    }
  }

  render() {
    const {
      filterByList,
      filterByListSelectedValue,
      fromDate,
      toDate,
      isFromDatePicker,
      isToDatePicker,
      selectedRadioButton,
      selectedListType,
      transactionList,
      selectedYears,
      filterByYearSelectedValue,
      selectedMonths,
    } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {/* filter by container */}
        <View style={styles.filterByContainer}>
          <Text style={styles.filterByTextStyle}>{I18n.t('FILTER_BY')}</Text>
          <RNPickerSelect
            testID={'bankPicker'}
            style={{
              inputIOS: styles.filterByPickerStyle,
              inputAndroid: styles.filterByPickerStyle,
              iconContainer: styles.dropdownIconStyle,
            }}
            placeholder={{}}
            onValueChange={this.onSelectedFilter}
            value={filterByListSelectedValue}
            items={filterByList}
            Icon={this.dropDownArrowView}
          />
        </View>
        {filterByListSelectedValue === I18n.t('CUSTOM_TIMEFRAME') ? (
          <View>
            {/* from to container */}
            <View style={styles.fromToContainer}>
              <Text style={styles.fromTextStyle}>{I18n.t('FROM_FUND')}</Text>
              <TouchableOpacity style={[styles.dateContainer]} onPress={this.showFromDatePicker}>
                <Text style={styles.dateText}>
                  {moment(fromDate).format(TextFormats.DATE_SHOW_FORMAT)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.toTextStyle}>{I18n.t('TO')}</Text>
              <TouchableOpacity style={[styles.dateContainer]} onPress={this.showToDatePicker}>
                <Text style={styles.dateText}>
                  {moment(toDate).format(TextFormats.DATE_SHOW_FORMAT)}
                </Text>
              </TouchableOpacity>
            </View>
            {/* status container */}
            <View
              style={[styles.rowStyle, styles.containerMargin, styles.marginForStatusContainer]}
            >
              <View style={[styles.radionButtonContainer, styles.marginForRadioButton]}>
                <Text style={styles.statusText}>{I18n.t('STATUS')}</Text>
                <RadioButton
                  buttonStyle={styles.radioButtonStyle}
                  buttonSelectionStyle={styles.radioButtonSelection}
                  selected={selectedRadioButton === TransactionStatus.ALL}
                  onClick={this.selectedRadioButton.bind(this, TransactionStatus.ALL)}
                />
                <Text style={styles.statusStyle}>{I18n.t('STATUS_ALL')}</Text>
              </View>
              <View style={styles.lineStyle} />
              <View style={[styles.widthForRadoGroupRow, styles.spaceAroundStyle]}>
                {/* status approved */}
                <View style={[styles.radionButtonContainer]}>
                  <RadioButton
                    buttonStyle={styles.radioButtonStyle}
                    buttonSelectionStyle={styles.radioButtonSelection}
                    selected={selectedRadioButton === TransactionStatus.APPROVED}
                    onClick={this.selectedRadioButton.bind(this, TransactionStatus.APPROVED)}
                  />
                  <Text style={styles.statusStyle}>{I18n.t('STATUS_APPROVED')}</Text>
                </View>
                {/* status rejected */}
                <View style={[styles.radionButtonContainer]}>
                  <RadioButton
                    buttonStyle={styles.radioButtonStyle}
                    buttonSelectionStyle={styles.radioButtonSelection}
                    selected={selectedRadioButton === TransactionStatus.REJECTED}
                    onClick={this.selectedRadioButton.bind(this, TransactionStatus.REJECTED)}
                  />
                  <Text style={styles.statusStyle}>{I18n.t('STATUS_REJECTED')}</Text>
                </View>
                {/* status Mining */}
                <View style={[styles.radionButtonContainer]}>
                  <RadioButton
                    buttonStyle={styles.radioButtonStyle}
                    buttonSelectionStyle={styles.radioButtonSelection}
                    selected={selectedRadioButton === TransactionStatus.MINING}
                    onClick={this.selectedRadioButton.bind(this, TransactionStatus.MINING)}
                  />
                  <Text style={styles.statusStyle}>{I18n.t('STATUS_MINING')}</Text>
                </View>
              </View>

              <View style={[styles.spaceAroundStyle, styles.widthForRadoGroupRow]}>
                {/* status pending */}
                <View style={[styles.radionButtonContainer]}>
                  <RadioButton
                    buttonStyle={styles.radioButtonStyle}
                    buttonSelectionStyle={styles.radioButtonSelection}
                    selected={selectedRadioButton === TransactionStatus.PENDING}
                    onClick={this.selectedRadioButton.bind(this, TransactionStatus.PENDING)}
                  />
                  <Text style={styles.statusStyle}>{I18n.t('STATUS_PENDING')}</Text>
                </View>
                {/* status refunded */}
                <View style={[styles.radionButtonContainer]}>
                  <RadioButton
                    buttonStyle={styles.radioButtonStyle}
                    buttonSelectionStyle={styles.radioButtonSelection}
                    selected={selectedRadioButton === TransactionStatus.REFUNDED}
                    onClick={this.selectedRadioButton.bind(this, TransactionStatus.REFUNDED)}
                  />
                  <Text style={styles.statusStyle}>{I18n.t('STATUS_REFUNDED')}</Text>
                </View>
                {/* status mined */}
                <View style={[styles.radionButtonContainer]}>
                  <RadioButton
                    buttonStyle={styles.radioButtonStyle}
                    buttonSelectionStyle={styles.radioButtonSelection}
                    selected={selectedRadioButton === TransactionStatus.MINED}
                    onClick={this.selectedRadioButton.bind(this, TransactionStatus.MINED)}
                  />
                  <Text style={styles.statusStyle}>{I18n.t('STATUS_MINED')}</Text>
                </View>
              </View>
            </View>
            {/* gradient separator view */}
            <LinearGradient
              colors={[Colors.ghostWhite, Colors.white]}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 0, y: 1 }}
              style={styles.borderLineStyle}
            />
            <View style={[styles.spaceAroundStyle, styles.rowStyle, styles.listHeaderStyle]}>
              {/* header type buttons */}
              {this.renderTitle(selectedListType, 'ALL')}
              {this.renderTitle(selectedListType, 'SENT')}
              {this.renderTitle(selectedListType, 'RECEIVED')}
              {this.renderTitle(selectedListType, 'BOUGHT')}
              {this.renderTitle(selectedListType, 'SOLD')}
            </View>
            {/* Transaction list */}
            <FlatList
              ref={(ref) => {
                this.statementsFlatListRef = ref
              }}
              data={transactionList}
              style={styles.flatlistStyle}
              contentContainerStyle={
                transactionList.length === 0 ? styles.listContentContainer : {}
              }
              ListEmptyComponent={
                <EmptyListView
                  height={styles.emptyListImageStyle.height}
                  width={styles.emptyListImageStyle.width}
                  color={Colors.mediumTurquoise}
                />
              }
              renderItem={this.renderData}
              ListFooterComponent={this.renderFooter}
              onEndReachedThreshold={0.01}
              onEndReached={this.loadMoreData}
              extraData={this.state.isOpen}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <View>
            {/* filter by year */}
            <View style={styles.filterByContainer}>
              <Text style={styles.filterByYearTextStyle}>{I18n.t('FILTER_BY_YEAR')}</Text>
              <RNPickerSelect
                style={{
                  inputIOS: styles.filterByYearPickerStyle,
                  inputAndroid: styles.filterByYearPickerStyle,
                  iconContainer: styles.dropdownIconStyle,
                }}
                placeholder={{}}
                onValueChange={this.onSelectedYearFilter}
                value={filterByYearSelectedValue}
                items={selectedYears}
                Icon={this.dropDownArrowView}
              />
            </View>
            {/* gradient separator view */}
            <LinearGradient
              colors={[Colors.ghostWhite, Colors.white]}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 0, y: 1 }}
              style={styles.borderLineStyle}
            />
            <View style={styles.scrollViewStyle}>
              <ScrollView>
                {selectedMonths.map((item, index) => this.renderMonthView(item))}
              </ScrollView>
            </View>
          </View>
        )}
        {/* date picker modal */}
        <DateTimePicker
          maximumDate={toDate}
          date={fromDate}
          isVisible={isFromDatePicker}
          onConfirm={this.handleFromDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <DateTimePicker
          maximumDate={new Date()}
          minimumDate={fromDate}
          date={toDate}
          isVisible={isToDatePicker}
          onConfirm={this.handleToDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </SafeAreaView>
    )
  }

  /**
   * render month view
   * @param {String} content current date
   * @param {} onPress refers no of days to substract from current date
   * @returns {TouchableOpacity} returns month container
   */
  renderMonthView = (month) => {
    const {
      filterByYearSelectedValue,
      transactionListMonthWise,
      isExtraDataForMonthWise,
      selectedMonth,
    } = this.state
    return (
      <TouchableOpacity
        style={styles.containerMargin}
        onPress={this.getMonthlyTransactionList.bind(this, filterByYearSelectedValue, month)}
      >
        <View style={styles.monthContainer}>
          <DropDownArrow
            width={styles.arrowImageStyle.width}
            height={styles.arrowImageStyle.height}
          />
          <Text style={styles.dateMonthText}>
            {Months[month] + ' ' + filterByYearSelectedValue}
          </Text>
        </View>
        <View style={styles.downloadView}>
          <View style={styles.downloadTextContainer}>
            <Text style={styles.downloadText}>{I18n.t('DOWNLOAD')}</Text>
          </View>
          {this.renderDownloadView('XLS')}
          {this.renderDownloadView('CSV')}
          {this.renderDownloadView('PDF')}
        </View>
        {/* Transaction list for month wise */}
        {selectedMonth === month && (
          <FlatList
            style={styles.containerMargin}
            ListEmptyComponent={
              <EmptyListView
                height={styles.emptyListImageStyle.height}
                width={styles.emptyListImageStyle.width}
                color={Colors.mediumTurquoise}
              />
            }
            data={transactionListMonthWise}
            renderItem={this.renderListForSelectedMonth}
            extraData={isExtraDataForMonthWise}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </TouchableOpacity>
    )
  }

  getMonthlyTransactionList = (year, month) => {
    // close expnaded month if already open
    if (this.state.selectedMonth === month) {
      this.setState({
        selectedIndexMonthWise: -1,
        selectedMonth: -1,
      })
      return
    }
    this.props.getMonthlyTransactionList(year, month, (data) => {
      this.setState({ transactionListMonthWise: data, selectedMonth: month })
    })
  }

  /**
   * render flatlist data
   * @param {Object} item refers list itearation object
   * @returns {TransListItem} returns list iteration view
   */
  renderListForSelectedMonth = ({ item, index }) => {
    const {
      transactionDetailMonthWise,
      selectedIndexMonthWise,
      isExtraDataForMonthWise,
    } = this.state
    return (
      <TransListItem
        type={item.operationType}
        currency={item.currency}
        source={item.source}
        amountUSD={item.amountUsd}
        amountCrypo={item.amountCrypto}
        inVoice={item.address}
        detailData={transactionDetailMonthWise}
        showExtraData={index === selectedIndexMonthWise && isExtraDataForMonthWise}
        rate={item.rate}
        date={item.date}
        transaction={item}
        transactionId={item.transactionId}
        onPress={this.onPressListForMonthlyList.bind(this, item, index)}
      />
    )
  }

  /**
   * renders transaction title
   * @returns {View} returns text title
   */
  onPressListForMonthlyList(item, index) {
    if (this.state.selectedIndexMonthWise === index) {
      this.setState({
        selectedIndexMonthWise: -1,
        isExtraDataForMonthWise: !this.state.isExtraDataForMonthWise,
      })
      return
    }
    if (item.operationType.includes(DefaultStrings.FIAT)) {
      this.props.getMonthlyTransactionDetail(
        DefaultStrings.FIAT_TRANSFER_TRANSACTIONS,
        item.transactionId,
        this.setMonthlyTransactionDetail
      )
    } else if (item.operationType === DefaultStrings.CRYPTO_IN) {
      this.props.getMonthlyTransactionDetail(
        DefaultStrings.CRYPTO_IN_CAPS,
        item.transactionId,
        this.setMonthlyTransactionDetail
      )
    } else if (item.operationType === DefaultStrings.CRYPTO_OUT) {
      this.props.getMonthlyTransactionDetail(
        DefaultStrings.CRYPTO_OUT_CAPS,
        item.transactionId,
        this.setMonthlyTransactionDetail
      )
    } else {
      this.props.getMonthlyTransactionDetail(
        item.operationType,
        item.transactionId,
        this.setMonthlyTransactionDetail
      )
    }
    this.setState({ selectedIndexMonthWise: index })
  }

  /**
   * set monthly tranaction list detail
   * @param {Object} data is set to monthly transaction detail
   */
  setMonthlyTransactionDetail = (data) => {
    this.setState({ transactionDetailMonthWise: data, isExtraDataForMonthWise: true })
  }

  /**
   * render download view
   * @param {String} content current date
   * @param {Function} onPress refers on press function for render downoad button
   * @returns {TouchableOpacity} returns viw
   */
  renderDownloadView = (content, onPress) => {
    return (
      <TouchableOpacity style={styles.downloadbuttonStyle} onPress={onPress}>
        <Text style={styles.downloadButtonText}>{I18n.t(content)}</Text>
      </TouchableOpacity>
    )
  }

  /**
   * get date months before current days
   * @param {Object} date refers current date
   * @param {Integer} nofDays refers no of days to substract from current date
   * @returns {Object} date to get substracted date
   */
  getDateMonthsBefore(date, nofDays) {
    var toDayDate = date.getDate()
    // set the month index of the date by subtracting nofMonths from the current month index
    date.setDate(toDayDate - nofDays)
    return date
  }

  /**
   * render flatlist data
   * @param {Object} item refers list itearation object
   * @returns {TransListItem} returns list iteration view
   */
  renderData = ({ item, index }) => {
    return (
      <TransListItem
        type={item.operationType}
        currency={item.currency}
        source={item.source}
        amountUSD={item.amountUsd}
        amountCrypo={item.amountCrypto}
        inVoice={item.address}
        detailData={this.props.transactionDetail}
        showExtraData={index === this.state.selectedIndex && this.state.isOpen}
        rate={item.rate}
        date={item.date}
        transaction={item}
        transactionId={item.transactionId}
        onPress={this.onPressListItem.bind(this, item, index)}
      />
    )
  }

  /**
   * renders transaction title
   * @returns {View} returns text title
   */
  onPressListItem(item, index) {
    if (this.state.selectedIndex === index && this.state.isOpen) {
      this.setState({ selectedIndex: -1, isOpen: !this.state.isOpen })
      return
    }
    if (item.operationType.includes(DefaultStrings.FIAT)) {
      this.props.getTransactionDetail(DefaultStrings.FIAT_TRANSFER_TRANSACTIONS, item.transactionId)
    } else if (item.operationType === DefaultStrings.CRYPTO_IN) {
      this.props.getTransactionDetail(DefaultStrings.CRYPTO_IN_CAPS, item.transactionId)
    } else if (item.operationType === DefaultStrings.CRYPTO_OUT) {
      this.props.getTransactionDetail(DefaultStrings.CRYPTO_OUT_CAPS, item.transactionId)
    } else {
      this.props.getTransactionDetail(item.operationType, item.transactionId)
    }
    this.setState({ selectedIndex: index })
  }

  /**
   * render loader footer for pagination
   */
  renderFooter = () => {
    return (
      this.state.loadMoreData && (
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
            color={Colors.mediumTurquoise}
            animating={this.state.loading}
          />
        </View>
      )
    )
  }

  /**
   * set transaction list
   * @param {Object} data refers data from response
   */
  getTransactionsList = (data, isLoader) => {
    if (!isLoader) this.setState({ loadMoreData: true })
    this.props.getTransactionsList(data, isLoader, this.setTransactionsList)
  }

  /**
   * set statements list
   * @param {Array} data refers data from response
   */
  setTransactionsList = (data) => {
    this.setState({
      totalTransactions: [...this.state.totalTransactions, ...data.data],
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      items: DefaultStrings.PAGINATION_ITEMS,
      loadMoreData: false,
    })
    this.onListSelect(this.state.selectedListType)
  }

  /**
   * load more contact list when on end scroll reached
   */
  loadMoreData = () => {
    const { totalPages, currentPage, fromDate, toDate } = this.state
    if (totalPages > currentPage) {
      this.getTransactionsList(
        {
          from: moment(fromDate).format(TextFormats.DATE_FORMAT),
          to: moment(toDate).format(TextFormats.DATE_FORMAT),
          page: this.state.currentPage + 1,
          items: DefaultStrings.PAGINATION_ITEMS,
        },
        false
      )
    }
  }

  /**
   * render wallet title for every component
   * @param {String} selectedListType refers selected list type
   * @param {String} currentType refers selected current type
   */
  renderTitle = (selectedListType, currentType) => {
    return (
      <TouchableOpacity
        testID={'AllSelect'}
        style={Platform.OS === 'android' ? styles.margins : {}}
        onPress={() => this.onListSelect(currentType)}
      >
        <View
          style={
            selectedListType === currentType ? styles.dotActiveContainer : styles.dotNormalContainer
          }
        >
          <Text
            style={selectedListType === currentType ? styles.activeDotText : styles.normalDotText}
          >
            {I18n.t(currentType)}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  /**
   * Change selected list type
   * @param {String} text refers selected list type
   */
  onListSelect = (text) => {
    this.setState({
      selectedListType: text,
      transactionList: [],
      selectedIndex: -1,
      isOpen: false,
    })
    const { totalTransactions } = this.state
    // change list data based on text value
    switch (text) {
      case DefaultStrings.SENT: {
        return this.setState(
          {
            transactionList: totalTransactions.filter(
              (it) =>
                it.operationType === DefaultStrings.WITHDRAW_SMALL ||
                it.operationType === DefaultStrings.SENT_SMALL ||
                it.operationType === DefaultStrings.FIAT_OUT ||
                it.operationType === DefaultStrings.CRYPTO_OUT
            ),
          },
          this.dofilterChanges
        )
      }
      case DefaultStrings.RECEIVED: {
        return this.setState(
          {
            transactionList: totalTransactions.filter(
              (it) =>
                it.operationType === DefaultStrings.RECEIVED_SMALL ||
                it.operationType === DefaultStrings.DEPOSIT_LOWER ||
                it.operationType === DefaultStrings.FIAT_IN ||
                it.operationType === DefaultStrings.CRYPTO_IN
            ),
          },
          this.dofilterChanges
        )
      }
      case DefaultStrings.BOUGHT: {
        return this.setState(
          {
            transactionList: totalTransactions.filter(
              (it) => it.operationType === DefaultStrings.BUY_SMALL
            ),
          },
          this.dofilterChanges
        )
      }
      case DefaultStrings.SOLD: {
        return this.setState(
          {
            transactionList: totalTransactions.filter(
              (it) => it.operationType === DefaultStrings.SELL_SMALL
            ),
          },
          this.dofilterChanges
        )
      }
      case DefaultStrings.ALL: {
        this.setState(
          {
            transactionList: totalTransactions,
          },
          this.dofilterChanges
        )
      }
    }
  }

  /**
   * do filter changed based on radio button changes
   */
  dofilterChanges = () => {
    const { selectedRadioButton, transactionList } = this.state
    if (selectedRadioButton !== 0) {
      let cryptoTransactions = transactionList.filter((it) =>
        [DefaultStrings.CRYPTO_IN, DefaultStrings.CRYPTO_OUT].includes(it.operationType)
      )

      let otherTransactions = transactionList.filter(
        (it) => ![DefaultStrings.CRYPTO_IN, DefaultStrings.CRYPTO_OUT].includes(it.operationType)
      )
      let cryptoTransactionsFilter = cryptoTransactions.filter(
        (it) => it.status === cryptoStatus[this.state.selectedRadioButton]
      )
      let otherTransactionsFilter = otherTransactions.filter(
        (it) => it.status === this.state.selectedRadioButton
      )
      let totalArry = cryptoTransactionsFilter.concat(otherTransactionsFilter)
      if (totalArry.length === 0) this.loadMoreData()

      this.setState({
        transactionList: totalArry,
      })
    }
  }

  /**
   * update selected radio button to curret object
   * @param {Boolean} value selected radio button value
   */
  selectedRadioButton = (value) => {
    this.setState(
      {
        selectedRadioButton: value,
      },
      this.onListSelect.bind(this, this.state.selectedListType)
    )
  }

  /**
   * It updates the datePickerVisible boolean by false,
   * and it can allow to hide the datePicker
   */
  hideDateTimePicker = () => {
    this.setState({ isFromDatePicker: false, isToDatePicker: false })
  }

  /**
   * It updates the fromdatePickerVisible boolean by true,
   * and it can allow to show the datePicker
   */
  showFromDatePicker = () => {
    this.setState({ isFromDatePicker: true })
  }

  /**
   * It updates the to  datePickerVisible boolean by true,
   * and it can allow to show the datePicker
   */
  showToDatePicker = () => {
    this.setState({ isToDatePicker: true })
  }

  /**
   * handle from date picker confirm button
   * @param {String} date - refers selected from date
   */
  handleFromDatePicked = (date) => {
    this.setState({
      isFromDatePicker: false,
      fromDate: date,
    })
    let data = {
      from: moment(date).format(TextFormats.DATE_FORMAT),
      to: moment(this.state.toDate).format(TextFormats.DATE_FORMAT),
      page: 1,
      items: DefaultStrings.PAGINATION_ITEMS,
    }
    this.props.getTransactionsList(data, true, this.setDateFilterTransactionList)
  }

  /**
   * handle to date picker confirm button
   * @param {String} date - refers selected to date
   */
  handleToDatePicked = (date) => {
    this.setState({
      isToDatePicker: false,
      toDate: date,
    })
    let data = {
      from: moment(this.state.fromDate).format(TextFormats.DATE_FORMAT),
      to: moment(date).format(TextFormats.DATE_FORMAT),
      page: 1,
      items: DefaultStrings.PAGINATION_ITEMS,
    }
    this.props.getTransactionsList(data, true, this.setDateFilterTransactionList)
  }

  /**
   * set date filtered transaction list
   * @param {Array} data refers data from response
   */
  setDateFilterTransactionList = (data) => {
    this.setState({
      totalTransactions: data.data,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      items: DefaultStrings.PAGINATION_ITEMS,
      loadMoreData: false,
    })
    this.onListSelect(this.state.selectedListType)
  }

  /** update selected filter value
   * @param {String} value selected bank name
   * @param {number} index selected bank's list position
   */
  onSelectedFilter = (value, index) => {
    this.setState({
      filterByListSelectedValue: value,
    })
  }

  /** update selected filter for year value
   * @param {String} value selected bank name
   * @param {number} index selected bank's list position
   */
  onSelectedYearFilter = (value, index) => {
    this.setState({
      filterByYearSelectedValue: value,
    })
    this.calculateMonths(value)
  }

  /**
   * Dropdown view function
   * @returns {DropDownGray} returns Drop down arrow view
   */
  dropDownArrowView = () => {
    return (
      <DownArrow
        width={styles.dropDownImageStyle.width}
        height={styles.dropDownImageStyle.height}
      />
    )
  }

  /**
   * calculate years
   */
  calculateYearsAndMonths = () => {
    const registrationDate = this.props.onBoardingProfile.registration_date
    var fromDate = moment(registrationDate).toDate()
    fromDate = fromDate.getFullYear()

    var toDate = new Date()
    toDate = toDate.getFullYear()
    let arr = []

    for (let i = fromDate; i <= toDate; i++) arr.push({ label: i.toString(), value: i.toString() })
    this.setState({ selectedYears: arr, filterByYearSelectedValue: arr[arr.length - 1].value })
    this.calculateMonths(parseInt(arr[arr.length - 1].value))
  }

  calculateMonths = (Year) => {
    let registerdDate = moment(this.props.onBoardingProfile.registration_date).toDate()
    let currentDate = new Date()

    let registeredYear = parseInt(registerdDate.getFullYear())
    let currentYear = parseInt(currentDate.getFullYear())
    let selectedYear = parseInt(Year)

    if (selectedYear > registeredYear && selectedYear < currentYear) {
      this.setMonth(1, 12)
    } else if (selectedYear === registeredYear) {
      this.setMonth(registerdDate.getMonth() + 1, currentDate.getMonth() + 1)
    } else if (selectedYear === currentYear) {
      this.setMonth(1, currentDate.getMonth() + 1)
    }
  }

  setMonth = (fromMonth, toMonth) => {
    let selectedMonths = []
    for (let i = fromMonth; i <= toMonth; i++) {
      selectedMonths.push(i)
    }
    this.setState({ selectedMonths: selectedMonths })
  }
}

StatementsScreen.propTypes = {
  getCountryList: PropTypes.func,
  signUp: PropTypes.func,
  countryList: PropTypes.array,
  isLoading: PropTypes.bool,
  getTransactionsList: PropTypes.func,
  transactionList: PropTypes.func,
  getTransactionDetail: PropTypes.func,
  transactionDetail: PropTypes.object,
  onBoardingProfile: PropTypes.object,
  getMonthlyTransactionList: PropTypes.func,
  getMonthlyTransactionDetail: PropTypes.func,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  transactionList: state.user.transactionList,
  transactionDetail: state.wallet.transactionDetail,
  onBoardingProfile: state.user.onBoardingProfile,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getTransactionsList: (data, isLoader, successFn) =>
    dispatch(UserActions.getTransactionList(data, isLoader, successFn)),
  getTransactionDetail: (operationType, id) =>
    dispatch(WalletActions.getTransactionDetail(operationType, id)),
  getMonthlyTransactionList: (year, month, successFn) =>
    dispatch(UserActions.getMonthlyTransactionList(year, month, successFn)),
  getMonthlyTransactionDetail: (operationType, id, successfn) =>
    dispatch(WalletActions.getMonthlyTransactionDetail(operationType, id, successfn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatementsScreen)
