import '../ViewTeam/ViewTeam.scss';
import GenarateName from '../namecirclegenerator/criclegenrator';

const ViewTeam = ({info}) => {
    let content = info.map((items) => {
        return (
            <div className="name_circle">

            <GenarateName name={items.name}/>
            </div>
        );
    })
    return <div className="team_container">{content}</div>
}

export default ViewTeam;