import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

class WallActions {
	
	itemAdd(item) {
		Dispatcher.dispatch({
			actionType: ActionTypes.ITEM_ADD,
			payload: item,
		});
	}

	itemRemove(id) {
		Dispatcher.dispatch({
			actionType: ActionTypes.ITEM_REMOVE,
			payload: id
		});
	}

	itemMove(id, x, y, width, height, rotation) {
		Dispatcher.dispatch({
			actionType: ActionTypes.ITEM_MOVE,
			payload: { id: id, x: x, y: y, width: width, height: height, rotation: rotation},
		});
	}

	itemClick(id) {
		Dispatcher.dispatch({
			actionType: ActionTypes.ITEM_CLICK,
			payload: id,
		});
	}

    wallLoad(loadData) {
        Dispatcher.dispatch({
            actionType: ActionTypes.WALL_LOAD,
            payload: loadData,
        });
    }

    wallRename(name) {
        Dispatcher.dispatch({
            actionType: ActionTypes.WALL_RENAME,
            payload: name,
        });
    }
}

export default new WallActions();
