import css from './column.module.scss';
import Scrollbars from "react-custom-scrollbars-2";
import {useLayout} from "../../../hooks/layout/use-layout";
import {useTasks} from "../../../hooks/tasks/use-tasks";
import {Card} from "./card/card";
import {useState} from "react";
import {IconAdd} from '../../shared/icons/icon-add'

export const Column = (props) => {
    const [isNewTaskInputShown, setIsNewTaskInputShown] = useState(false);
    const [inputCardName, setInputCardName] = useState();

    const [isNewTaskSelectShown, setIsNewTaskSelectShown] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(undefined);

    const {mainContentHeight} = useLayout();

    const {getTasksByState, getTasksInPreviousState, getInfoAboutPreviousState, addTask, moveTask, removeTask } = useTasks();

    const tasks = getTasksByState(props.state);
    const hasTasks = tasks.length > 0;

    const onInputCard = (e) => {
        setInputCardName(e.target.value);
    }

    return (
        <div className={css.column}>
            <div className={css.header}>{props.name}</div>
            <div className={css.wrapper}>
                <div className={css.body}>

                    {hasTasks &&
                    <Scrollbars autoHeightMax={mainContentHeight} autoHide autoHeight>
                        {
                            tasks.map((task) =>
                                <Card key={task.id} id={task.id} name={task.name} onRemove={(id) => {
                                    removeTask(id);
                                }
                                }/>)
                        }
                    </Scrollbars>
                    }

                    {isNewTaskInputShown &&
                    <div>
                        <input onInput={onInputCard} />
                    </div>
                    }

                    {isNewTaskSelectShown &&
                    <select onChange={(e) =>
                        setSelectedTaskId(e.target.value)}
                    >
                        <option>Select Task</option>
                        {getTasksInPreviousState(props.state).map((task) =>
                            <option key={task.id} value={task.id}>{task.name}</option>
                        )}
                    </select>
                    }
                </div>
                <div className={css.footer}>
                    {(!isNewTaskInputShown && !isNewTaskSelectShown) &&
                    <button onClick={() => props.state === 'backlog'
                        ? setIsNewTaskInputShown(true)
                        : setIsNewTaskSelectShown(true)}
                        className={css.add}
                        disabled={getInfoAboutPreviousState(props.state)}
                    ><IconAdd/> Add Card</button>}
                    {(isNewTaskInputShown || isNewTaskSelectShown) &&
                    <button onClick={() => {
                        if (props.state === 'backlog') {
                            setIsNewTaskInputShown(false)
                            addTask(inputCardName);
                            setInputCardName(undefined);
                        } else {
                            setIsNewTaskSelectShown(false);
                            moveTask(selectedTaskId, props.state);
                        }
                    }}
                    className={css.submit}
                    >Submit</button>
                    }
                    {(isNewTaskInputShown || isNewTaskSelectShown)
                    && <button onClick={() => {setIsNewTaskInputShown(false); setIsNewTaskSelectShown(false)}} className={css.hide}> Hide</button>}
                </div>
            </div>
        </div>
    )
}
