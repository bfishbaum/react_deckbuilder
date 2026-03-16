import { type Resources, ResourceIcons } from '../types/board'

export const ResourcePanel = ({ resources }: { resources: Resources }) => {
	return (
		<div className="resource-panel">
			{Object.entries(resources).map(([key, value]) => (
				<div key={key} className="resource-panel-item">
					<p style={{ minWidth: '100%', textAlign: 'justify', textAlignLast: 'left', marginBlockEnd: '0px', marginBlockStart: '0px' }}>
						{ResourceIcons[key as keyof Resources]} {value}
					</p>
				</div>
			))
			}
		</div >
	)
}