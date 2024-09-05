import { useEffect, useState } from 'react'
import Tree from 'react-d3-tree'
import './App.css'
import useCenterTree from './useCenterTree';
import RenderRectSvgNode from './components/rectSvgNode';
import { teamMembersArr } from './teamMemberData';

function App() {

  const [treeData, setTreeData] = useState([]);
  const [translate, containerRef] = useCenterTree();

  const buildTree = (teamMembersArr, parentId = null) => {
    const tree = [];
    teamMembersArr.forEach((teamMember) => {
      if ((!teamMember["reporting_manager"] && !parentId) || (teamMember["reporting_manager"] === parentId)) {
        tree.push({
          ...teamMember,
          children: buildTree(teamMembersArr, teamMember?.id)

        })
      }
    })
    return tree;
  }



  useEffect(() => {
    setTreeData(buildTree(teamMembersArr))
  }, [])

  function customPathFunc(linkDatum) {
    const { source, target } = linkDatum
    const deltaY = target.y - source.y;
    return `M${source.x},${source.y} V${source.y + deltaY / 2} H${target.x}  V${
      target.y
    }`;
  }

  return (
    <>
      <div className='title'>Team Members Tree</div>
      <div className='tree-container' ref={containerRef}>
        {
          treeData?.length && (
            <Tree
              data={treeData}
              translate={translate}
              orientation='vertical'
              enableLegacyTransitions
              nodeSize={{ x: 300, y: 200 }}
              transitionDuration={400}
              renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
                <RenderRectSvgNode nodeDatum={nodeDatum} toggleNode={toggleNode} />
              )}
              pathFunc={customPathFunc}
              zoom={0.7}
            />
          )
        }
      </div>
    </>
  )
}

export default App
