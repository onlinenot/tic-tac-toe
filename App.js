import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  Linking
} from "react-native";

import Constants from "expo-constants";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class App extends React.Component {
  state = {
    gameState: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    currentPlayer: 1
  };

  // create new Game
  componentDidMount = () => {
    this.initGame();
  };

  // create new Game Func
  initGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    });
  };

  // return Icon of player
  randerIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  // find the winner of the game
  getWinner = () => {
    const { gameState } = this.state;
    let sum;
    let sum2;

    // Find X and Y sum for winner
    for (var i = 0; i < 3; i++) {
      sum = gameState[0][i] + gameState[1][i] + gameState[2][i];
      sum2 = gameState[i][0] + gameState[i][1] + gameState[i][2];

      // if Player 1 was winner
      if (sum == 3 || sum2 == 3) {
        return 1;
      }

      // if Player -1 was winner
      if (sum == -3 || sum2 == -3) {
        return -1;
      }
    }

    // find X winner
    sum = gameState[0][0] + gameState[1][1] + gameState[2][2];
    if (sum == 3) {
      return 1;
    }
    if (sum == -3) {
      return -1;
    }

    sum = gameState[2][0] + gameState[1][1] + gameState[0][2];
    if (sum == 3) {
      return 1;
    }
    if (sum == -3) {
      return -1;
    }
    return 0;
  };

  // on Press the game
  onTilePress = (row, col) => {
    const { gameState, currentPlayer } = this.state;

    // if the table already was taken
    if (gameState[row][col] !== 0) {
      return;
    }

    let arr = gameState.slice(); // silce array

    // set the pressed row for current player
    arr[row][col] = currentPlayer;

    this.setState({ gameState: arr, currentPlayer: -currentPlayer });

    // check for winner
    let winner = this.getWinner();

    if (winner == 1) {
      Alert.alert(
        "Player 1 win the game",
        "nice jub",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "New Game", onPress: () => this.initGame() }
        ],
        { cancelable: false }
      );
    }
    if (winner == -1) {
      Alert.alert(
        "Player 2 win the game",
        "nice jub",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "New Game", onPress: () => this.initGame() }
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* nav bar start */}
        <View>
          <Text style={styles.header}>
            Player{" "}
            {this.state.currentPlayer == 1 ? (
              <Text style={{ color: "red" }}>1</Text>
            ) : (
              <Text style={{ color: "green" }}>2</Text>
            )}
            {""} Turn
          </Text>
        </View>
        {/* nav bar end */}

        {/* game bar start */}
        {/* first row start */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}
          >
            {this.randerIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}
          >
            {this.randerIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
          >
            {this.randerIcon(0, 2)}
          </TouchableOpacity>
        </View>
        {/* first row end */}

        {/* secund row start */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}
          >
            {this.randerIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={styles.tile}
          >
            {this.randerIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}
          >
            {this.randerIcon(1, 2)}
          </TouchableOpacity>
        </View>
        {/* secund row end */}

        {/* third row start */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}
          >
            {this.randerIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}
          >
            {this.randerIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}
          >
            {this.randerIcon(2, 2)}
          </TouchableOpacity>
        </View>
        {/* third row start */}

        {/* game bar end */}
        {/* new game Btn start */}
        <View>
          <View style={styles.btnView} />
          <Button onPress={this.initGame} title="new game" />
        </View>
        {/* new game Btn end */}
        {/* creator start */}
        <View style={{ marginTop: 30 }} />
        <Text>
          Crete By{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("https://github.com/onlinenot")}
          >
            Foad Heidari
          </Text>
          {/* creator end */}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  tileX: {
    color: "red",
    fontSize: 60,
    position: "relative"
  },
  tileO: {
    color: "green",
    fontSize: 60
  },
  btnView: {
    marginTop: 50,
    color: "red"
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    height: 80
  }
});
