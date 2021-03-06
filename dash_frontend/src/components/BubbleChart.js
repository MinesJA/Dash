import React from 'react'
import BubbleChart from '@weknow/react-bubble-chart-d3'
import {connect} from 'react-redux'

class BubbleWeb extends React.Component {

  data() {
    const friendsAndCategories = this.props.user.friends.filter(friend => friend.name !== this.props.user.name)
    const friendCategories = []
    const categoryCounts = {}
    const finalCounts = []
    for (const friend of friendsAndCategories){
      for (let i = 0; i < friend.friend_category.length; i++) {
        friendCategories.push(friend.friend_category[i].name)
      }
    }

    const filteredAll = friendCategories.filter(category => category !== "All")
    for (let i = 0; i < filteredAll.length; i++) {
      let value = filteredAll[i];
      if (typeof categoryCounts[value] === "undefined") {
        categoryCounts[value] = 1
      } else {
        categoryCounts[value]++
      }
    }

    for (const key in categoryCounts) {
      finalCounts.push({"label": key, "value": categoryCounts[key]})
    }
    return finalCounts
  }

  render() {
    return (
        <div>
          <BubbleChart
          graph={{
            zoom: 0.75,
            offsetX: 0.15,
            offsetY: 0,
          }}
            width={400}
            height={300}
            showLegend={false}
            valueFont={{
                  family: 'Arial Rounded MT Bold',
                  size: 12,
                  color: '#fff',
                  weight: 'bold',
                }}
            labelFont={{
                  family: 'Arial Rounded MT Bold',
                  size: 12,
                  color: '#fff',
                  weight: 'bold',
                }}
            data={this.data()}
          />
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(BubbleWeb)
