class Users extends React.Component {
  state = {
    items: null
  };

  componentDidMount() {
    this.update();
  }

  render() {
    //const { done: doneHeading } = this.props;
    //const { items } = this.state;
    //const heading = doneHeading ? 'Completed' : 'Todo';

    if (items === null || items.length === 0) {
      return null;
    }

    return (
      <View style={{ marginBottom: 16, marginHorizontal: 16 }}>
        <Text style={styles.sectionHeading}>{heading}</Text>
        {items.map(({ id, done, value }) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
            style={{
              backgroundColor: done ? '#1c9963' : '#fff',
              borderColor: '#000',
              borderWidth: 1,
              padding: 8
            }}>
            <Text style={{ color: done ? '#fff' : '#000' }}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}