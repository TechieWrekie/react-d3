import {  useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from "antd";
import PlusIcon from '../assets/plus-icon.svg'
import MinusIcon from '../assets/minus-icon.svg'
import { UserOutlined } from '@ant-design/icons';



const RenderRectSvgNode = ({ nodeDatum, toggleNode }) => {

    const isCollapse = nodeDatum.__rd3t?.collapsed;
    const [avatarColor, setAvatarColor] = useState('');


    useEffect(() => {
        const randomColorGenerator = () => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`;
        };

        setAvatarColor(randomColorGenerator());
    }, []);




    return (
        <g>
            <foreignObject width="262" height="146" x="-125" y="-75">
                <div className="box">
                    <div>
                        <Avatar style={{ backgroundColor: avatarColor, marginTop: "8px" }}
                            icon={<UserOutlined />}
                        />
                    </div>
                    <div className="profileInfo">
                        <p className="name">{nodeDatum?.name}</p>
                        <p className="role">
                            {nodeDatum?.position || "--"}
                        </p>
                        <p className="info">{nodeDatum.project || "--"}</p>
                    </div>
                </div>
            </foreignObject>

            {nodeDatum.children.length && (
                <svg width="34" height="34" x="-15" y="56" onClick={toggleNode}>
                    <circle r={15} cx={16} cy={16} fill="#F7CF51" />
                    <foreignObject width="26" height="26" >
                        <img
                            src={isCollapse === true ? PlusIcon : MinusIcon}
                            width="16px"
                            height="16px"
                            alt="add-icon"
                            style={{ padding: "8px" }}
                        />
                    </foreignObject>
                </svg>
            )}
        </g>
    )
}
RenderRectSvgNode.propTypes = {
    nodeDatum: PropTypes.object.isRequired,
    toggleNode: PropTypes.object.isRequired,
};

export default RenderRectSvgNode