import React from 'react';
import { View } from 'react-native';
import { DeviceWidth } from '../DeviceDeminsions/DeviceDeminsions';
import { RowText } from '../../Modules/GlobalStyles/GlobalStyle';
import { Darkest } from '../../Modules/GlobalStyles/GlobalColors';
import { Divider } from 'react-native-elements';

interface DesginProps {
  Name: string;
  Description: string;
}
const DescriptionList = (props: DesginProps) => {
  let { Name, Description } = props;
  return (
    (Name && Description && (
      <>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 0,
            marginRight: 15,
            paddingTop: 6,
            backgroundColor: '#fff',
            minWidth: DeviceWidth,
          }}>
          <RowText fontColor={Darkest} fontize={15} fontFormat="Normal">
            {Name}
          </RowText>
          <RowText
            fontColor={Darkest}
            fontize={15}
            style={{ paddingLeft: 5, paddingRight: 25 }}>
            :
          </RowText>
          <RowText fontColor={Darkest} fontize={15} fontFormat="Normal">
            {Description}
          </RowText>
        </View>
        {/* <Divider
        //   style={{ backgroundColor: Darkest, width: DeviceWidth / 1.2 }}
        /> */}
      </>
    )) || <></>
  );
};

export default DescriptionList;
