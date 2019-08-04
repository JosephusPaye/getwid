/**
* External dependencies
*/
import GetwidAnimationSelectControl from 'GetwidControls/animation-select-control';
import GetwidStyleLengthControl from 'GetwidControls/style-length-control';
import FocusPanelBody from 'GetwidControls/focus-panel-body';
import { times, escape, unescape} from 'lodash';


/**
* WordPress dependencies
*/
import { __ } from 'wp.i18n';
const {Component, Fragment} = wp.element;
const {
	InspectorControls,
	URLInput,
} = wp.editor;
const {
	PanelBody,
	BaseControl,
	SelectControl,
	TextareaControl,
	ToggleControl,
	TextControl,
	Button,
	Modal,
	ButtonGroup,
	RadioControl
} = wp.components;


/**
* Module Constants
*/
const NEW_TAB_REL = 'noreferrer noopener';


/**
* Create an Inspector Controls
*/
class Inspector extends Component {

	constructor() {
		super(...arguments);
	}

	hasMargin() {
		const {attributes: {marginTop, marginBottom, marginLeft, marginRight}} = this.props;
		return marginTop !== undefined ||
			marginBottom !== undefined ||
			marginRight !== undefined ||
			marginLeft !== undefined;
	}

	render() {
		const {
			attributes: {
				id,
				imageSize,
				imagePoints,
				marginTop,
				marginBottom,
				marginLeft,
				marginRight,

				hoverAnimation,
			},
			setAttributes,
			className,
			imgObj,

			//Functions
			onCancelPoint,
			onDeletePoint,
			updateArrValues,
			changeImageSize,
			changeState,
			getState
		} = this.props;

		const imagePointsParsed = (imagePoints != '' ? JSON.parse(imagePoints) : []);

		const renderEditModal = ( index ) => {
			if (typeof imagePointsParsed[ index ] !== 'undefined') {
				// debugger;
				return (
					<Fragment>
						{ ( (getState('action') == 'edit' || getState('action') == 'drop') && getState('editModal') == true) ?
						<Modal
							className={`${className}__modal`}
							title= {__( 'Edit Point', 'getwid' )}
							onRequestClose={ () => {
								// changeState('action', false);
								// changeState('editModal', false);
								changeState({
									action: false,
									editModal: false
								});								

								if (getState('action') == 'drop'){
									onCancelPoint();		
								} else {
									changeState('currentPoint', null);
								}
							} }
						>
							<Fragment>
								<TextControl
									label={__('Title', 'getwid')}
									value={ imagePointsParsed[ index ].title }
									onChange={ value => {
										updateArrValues( { title: value }, index );
									} }
								/>
								<TextareaControl
									label={__('Popup Content. Plain Text or HTML.', 'getwid')}
									rows={'5'}
									value={ unescape(imagePointsParsed[ index ].content) }
									onChange={ value => {
										updateArrValues( { content: escape(value) }, index );
									} }
								/>

								<ToggleControl
									label={ __( 'Opened by default', 'getwid' ) }
									checked={imagePointsParsed[ index ].popUpOpen }
									onChange={ value => {
										updateArrValues( { popUpOpen: value }, index );
									} }
								/>

								<TextControl
									label={__('Popup Maximum Width, px.', 'getwid')}
									value={ imagePointsParsed[ index ].popUpMaxWidth }
									type={'number'}
									onChange={ value => {
										updateArrValues( { popUpMaxWidth: value }, index );
									}}
								/>

								<ButtonGroup>
									<Button isPrimary onClick={ 
										() => {
											// if (getState('action') == 'drop'){
											changeState({
												updatePoints: true,
												currentPoint: null,
												action: false,
												editModal: false
											});
											// changeState('updatePoints', true);												
											// }
											/* else if (getState('action') == 'edit') {
												initPoints(true, getState('currentPoint'));
											} */
											// changeState('currentPoint', null);
											// changeState('action', false);
											// changeState('editModal', false);
										}
									}>
										{ getState('action') == 'drop' ? __( 'Save', 'getwid' ) : __( 'Update', 'getwid' ) }
									</Button>

									{ getState('action') == 'drop' && (
										<Button isDefault onClick={
											() => {
												changeState({
													action: false,
													editModal: false
												});												
												// changeState('action', false);
												// changeState('editModal', false);

												onCancelPoint();
											}
										}>
											{ __( 'Cancel', 'getwid' ) }
										</Button>
									)}
								</ButtonGroup>


							</Fragment>
						</Modal>
						: null }
					</Fragment>
				);
			}

		};

		const renderPointsSettings = ( index ) => {

			if (typeof imagePointsParsed[ index ] !== 'undefined') {

				return (
					<FocusPanelBody
						title={ __( 'Point', 'getwid' ) + ': ' + imagePointsParsed[ index ].title }
						initialOpen={ false }
						onOpen={ () => {
							// getState('markerArrTemp')[index].setAnimation(google.maps.Animation.BOUNCE);
						}}
						onClose={ () => {
							// getState('markerArrTemp')[index].setAnimation(null);
						}}
					>

						<TextControl
							label={__('Title', 'getwid')}
							value={ imagePointsParsed[ index ].title }
							onChange={ value => {
								updateArrValues( { title: value }, index );
							} }
						/>
						<TextareaControl
							label={__('Popup Content. Plain Text or HTML.', 'getwid')}
							rows={'5'}
							value={ unescape(imagePointsParsed[ index ].content) }
							onChange={ value => {
								updateArrValues( { content: escape(value) }, index );
							} }
						/>

						<ToggleControl
							label={ __( 'Opened by default', 'getwid' ) }
							checked={imagePointsParsed[ index ].popUpOpen }
							onChange={ value => {
								updateArrValues( { popUpOpen: value }, index );
							} }
						/>

						<TextControl
							label={__('Popup Width', 'getwid')}
							value={ imagePointsParsed[ index ].popUpMaxWidth }
							type={'number'}
							onChange={ value => {
								updateArrValues( { popUpMaxWidth: value }, index );
							}}
						/>

						<ButtonGroup>
							<Button isPrimary onClick={ 
								() => {
									changeState('updatePoints', true);
								}
							}>
								{ __( 'Update', 'getwid' ) }
							</Button>

							<Button isDefault onClick={
								() => {
									onDeletePoint(index);
								}
							}>
								{ __( 'Delete', 'getwid' ) }
							</Button>
						</ButtonGroup>

					</FocusPanelBody>
				);

			}
		};		

		const onChangeImageSize = (imageSize) => {

			if (typeof imgObj != 'undefined'){
				setAttributes( {
					imageSize
				} );
				changeImageSize(imgObj, imageSize);
			}			
		};

		const resetMargin = () => {
			setAttributes({
				marginTop: undefined,
				marginBottom: undefined,
				marginLeft: undefined,
				marginRight: undefined
			})
		};

		return (
			<InspectorControls>

				<PanelBody
					title={__('Settings', 'getwid')}
				>
					<SelectControl
						label={__('Image Size', 'getwid')}
						help={__('For images from Media Library only.', 'getwid')}
						value={imageSize}
						onChange={onChangeImageSize}
						options={Getwid.settings.image_sizes}
					/>

					<GetwidAnimationSelectControl
						label={__('Image Hover Animation', 'getwid')}
						value={hoverAnimation !== undefined ? hoverAnimation : ''}
						onChange={hoverAnimation => setAttributes({hoverAnimation})}
						allowAnimation={['Seeker', 'Icon']}
					/>
				</PanelBody>

				{ renderEditModal(getState('currentPoint')) }

				{ imagePointsParsed.length > 0 && (
					<PanelBody title={ __( 'Points', 'getwid' ) }>

						{ times( imagePointsParsed.length, n => renderPointsSettings( n ) ) }
						
					</PanelBody>
				)}

                <PanelBody
                    title={__('Margin', 'getwid')}
                    initialOpen={false}
                >
                    <GetwidStyleLengthControl
                        label={__('Margin Top', 'getwid')}
                        value={marginTop}
                        onChange={marginTop => {
                            setAttributes({marginTop});
                        }}
                        allowNegative
                        allowAuto
                    />
                    <GetwidStyleLengthControl
                        label={__('Margin Bottom', 'getwid')}
                        value={marginBottom}
                        onChange={marginBottom => {
                            setAttributes({marginBottom});
                        }}
                        allowNegative
                        allowAuto
                    />
                    <GetwidStyleLengthControl
                        label={__('Margin Left', 'getwid')}
                        value={marginLeft}
                        onChange={marginLeft => {
                            setAttributes({marginLeft});
                        }}
                        allowNegative
                        allowAuto
                    />
                    <GetwidStyleLengthControl
                        label={__('Margin Right', 'getwid')}
                        value={marginRight}
                        onChange={marginRight => {
                            setAttributes({marginRight});
                        }}
                        allowNegative
                    />
					<BaseControl>
						<Button isLink
							onClick={resetMargin}
							disabled={ !this.hasMargin() }>
							{__('Reset', 'getwid')}
						</Button>
					</BaseControl>
                </PanelBody>

			</InspectorControls>
		);
	}
}

export default ( Inspector );