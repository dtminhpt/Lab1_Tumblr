
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  ListView,
  Image, 
  Dimensions
} from 'react-native';

import moment from 'moment';

var {height, width} = Dimensions.get('window')
export default class MyComponent extends Component {
    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      alert(width)
      console.log(height, width)
      this.state = {
        dataSource: ds.cloneWithRows([]),
        height: height,
        width: width
      };
    }

    componentWillMount() {
        fetch('https://api.tumblr.com/v2/blog/xkcn.info/posts/photo?api_key=Q6vHoaVm5L1u2ZAW1fqv3Jw48gFzYVg9P0vH0VHl3GVy6quoGV')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.response.posts)
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _renderRow(rowData){
        alert(this.state.width)
        if(!rowData) return;

        var _date = moment.unix(rowData.timestamp),
            uriImage = rowData.photos['0'].original_size.url;
            //console.log(JSON.stringify(rowData.photos['0']));
        
        var size = this.state.width * this.props.girl.photos[0].original_size.height / this.props.girl.photos[0].original_size.width;
        return (
            <View style={{flex: 1}}>
                <Text style={{ marginTop: 10, marginLeft: 20}}>{_date.fromNow()}</Text>
                <Image source={{uri: uriImage}} style={{ marginTop: 10, width: this.state.width, height: size}} />
            </View>
        )
    }

    render() {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}

        />
      );
    }
  }