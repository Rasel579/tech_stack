import React, { Component } from 'react';
import { Text, 
        TouchableWithoutFeedback, 
        View,
        LayoutAnimation,
        NativeModules 
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';


const { UIManager } = NativeModules;
    UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);

class ListItem extends Component {
    componentDidUpdate() {
        LayoutAnimation.linear();
    }

    renderDescription() {
        const { library, expanded } = this.props;
        console.log(this.props);
        if (expanded) {
            return (
                <CardSection>
                   <Text style={{ flex: 1, paddingLeft: 12, fontSize: 15 }}>
                     {library.item.description}
                    </Text>
                </CardSection>
            );
        }
    }
    
    render() {
        const { id, title } = this.props.library.item;
        const { titleStyle } = styles;
        
         return (
             <TouchableWithoutFeedback
             onPress={() => this.props.selectLibrary(id)}
             >
                 <View>
                    <CardSection>
                        <Text style={titleStyle}>{title}</Text>
                    </CardSection>
                    {this.renderDescription()}
                 </View>
             </TouchableWithoutFeedback>
         );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.SelectedLibraryId === ownProps.library.item.id;
     return {  expanded };
    };

export default connect(mapStateToProps, actions)(ListItem);
