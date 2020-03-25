import NetInfo from '@react-native-community/netinfo'

export default function handleConnectivityStatus() {
  return NetInfo.fetch().then((state) => {
    return Promise.resolve(state.isConnected)
  })
}
