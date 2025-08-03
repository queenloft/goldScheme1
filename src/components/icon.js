import {FontAwesome } from '@react-native-vector-icons/fontawesome';
import {TouchableOpacity} from 'react-native'

const RenderIcon = ({ name, color, size , onPress=()=>{}, style={}}) => {
  return <TouchableOpacity onPress={onPress}style={style}>
    <FontAwesome  name={name} color={color} size={size} />
  </TouchableOpacity>
};

export default RenderIcon;