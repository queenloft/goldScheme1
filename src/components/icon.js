import {Ionicons } from '@react-native-vector-icons/ionicons';
import {TouchableOpacity} from 'react-native'

const RenderIcon = ({ name, color, size , onPress=()=>{}, style={}}) => {
  return <TouchableOpacity onPress={onPress}style={style}>
    <Ionicons  name={name} color={color} size={size} />
  </TouchableOpacity>
};

export default RenderIcon;