/**
* External dependencies
*/
import classnames from 'classnames';
import './editor.scss';
import Inspector from './inspector';


/**
* WordPress dependencies
*/
const {
	Component,
	Fragment,
} = wp.element;
const {
	Button,
	ButtonGroup,
	Dashicon,
	Spinner,
	SelectControl,
	TextControl,
	Modal
} = wp.components;
const apiFetch = wp.apiFetch;
const {
	addQueryArgs
} = wp.url;
import { __ } from 'wp.i18n';
const {
	select,
	dispatch,
	withSelect,
} = wp.data;
const {
	parse,
} = wp.blocks;


/**
* Create an Component
*/
class Edit extends Component {
	constructor() {
		super( ...arguments );	

		this.changeState = this.changeState.bind(this);
		this.getState = this.getState.bind(this);	
		
		this.state = {
			pageTemplates: [],
			pageCategories: [],
			pageCategory: '',
			keywords: '',
			showLoadTemplates: true,
			needToUpdate: false,
			showModal: false,
			templateView: 'grid',
		};		
	}

	changeState (param, value) {
		if (typeof param == 'object'){
			this.setState(param);
		} else if (typeof param == 'string'){
			this.setState({[param]: value});
		}
	}

	getState (value) {
		return this.state[value];
	}

	getTemplates(cacheRequest = 'cache') {
		const {
			pageCategory,
			keywords
		} = this.state;	   
	   	// this.showLoadTemplates = true;	
		this.fetchRequest = apiFetch( {
			path: addQueryArgs( `/getwid/v1/get_remote_templates`, {
				search: keywords,
				category: pageCategory,
				cache: cacheRequest
			} ),
		} ).then(
			( templatesList ) => {
				console.warn(templatesList);
				debugger;	

				//Server valiable (data.status != 404)
				if (typeof templatesList.data == 'undefined'){
					if ( this.isStillMounted && templatesList instanceof Object ) {
						this.setState( {
							pageTemplates : templatesList,
							showLoadTemplates : false
						} );
					} else {
						this.setState( {
							pageTemplates: null,
							showLoadTemplates : false
						} );
					}
				}
			}
		).catch(
			(templatesList) => {
				if ( this.isStillMounted ) {
					this.setState( { pageTemplates: [] } );
				}
			}
		);		
	}

	getCategories(cacheRequest = 'cache') {
		this.fetchRequest = apiFetch( {
			path: addQueryArgs( `/getwid/v1/get_remote_categories`, {
				cache: cacheRequest
			} ),
		} ).then(
			( categoriesList ) => {
				console.log(categoriesList);
				debugger;

				//Server valiable (data.status != 404)
				if (typeof categoriesList.data == 'undefined'){
					if ( this.isStillMounted && categoriesList instanceof Object ) {
						this.setState( {
							pageCategories : categoriesList,
						} );
					} else {
						this.setState( {
							pageCategories: null,
						} );
					}				
				}
			}
		).catch(
			(categoriesList) => {
				if ( this.isStillMounted ) {
					this.setState( { pageCategories: [] } );
				}
			}
		);		
	}

	componentWillMount() {
		this.isStillMounted = true;
		this.getCategories();
		this.getTemplates();
	}

	componentDidUpdate(prevProps, prevState) {
		const changeState = this.changeState;

		const {
			needToUpdate,
		} = this.state;

		if (needToUpdate){
			this.getCategories();
			this.getTemplates();

			changeState({
				needToUpdate: false
			});			
		}
	}

	render() {
		const {
			className,
		} = this.props;

		const {
			pageCategory,
			keywords
		} = this.state;	 

		const changeState = this.changeState;
		const getState = this.getState;

		let pageTemplatesArr, pageCategoriesArr = [];		
	
		if (this.state.pageTemplates.length){
			pageTemplatesArr = this.state.pageTemplates;
		}		
	
		if (this.state.pageCategories){
			pageCategoriesArr = this.state.pageCategories;
		}

		const clientId = select('core/editor').getSelectedBlockClientId();

		const render_item = () => {
			if (pageTemplatesArr){
				return pageTemplatesArr.map((key, index) => {

					let categoriesArr = [];
					if (key.categories.length){
						key.categories.forEach(function(el) {
							categoriesArr.push(el.label)
						});
					}
	
					return (
						<div className="template-library-item">
							<Button
								className="components-button components-icon-button block-editor-inner-blocks__template-picker-option is-button is-default is-large"												
								key={ index }
								onClick={
									(e) => {
										console.log('Click on Template Item');
										const blocks = parse(key.content);
										dispatch('core/editor').replaceBlocks(clientId, blocks);
									}
								}
							>
								<div className="template-image-wrapper">
									<div className="template-image" style={{backgroundImage: `url('${key.image}')`}}></div>
								</div>
								<div className="template-content-wrapper">
									<div className="template-title">{ key.title }</div>									
									<div className="template-categories"> {categoriesArr.join(', ')}</div>
									{key.description != '' && (
										<div className="template-description"> {key.description}</div>
									)}
								</div>
							</Button>
						</div>																
					);
				});
			}
		};

		const renderCategoriesSelect = () => {
			return (
				<Fragment>		
					{this.state.pageCategories && (
						<SelectControl							
							label={ __( 'Page Categories', 'getwid' ) }
							autoFocus={ false }
							value={ pageCategory ? pageCategory : '' }
							onChange={ (value) => {
								changeState({
									pageCategory: value,
									needToUpdate: true
								});
							} }
							options={[
								...[{'value': '', 'label': 'All' }],
								...(pageCategoriesArr ? pageCategoriesArr : [])
							]}
						/>					
					)}
				</Fragment>
			);
		};

		const renderSearchField = () => {
			return (
				<Fragment>				
					<TextControl
						className={'template-search-field'}
						label={__('Template keywords', 'getwid')}
						value={ keywords ? keywords : '' }
						onChange={ value => {
							if (value == ''){
								changeState({
									keywords: value,
									needToUpdate: true
								});	
							} else {
								changeState({
									keywords: value,
								});
							}
						} }
					/>	
					<ButtonGroup
						className={'template-search-group'}
					>
						<Button
							className={'template-search-button'}
							isPrimary
							onClick={ () => {
								changeState({
									needToUpdate: true
								});
							}}
						>
							{ __( 'Search', 'getwid' ) }
						</Button>
						<Button
							className={'template-search-button'}
							isDefault
							onClick={ () => {
								this.setState( { showLoadTemplates : true } );
								this.getCategories('refresh');
								this.getTemplates('refresh');
							}}
						>
							{ __( 'Update Templates (Refresh cache)', 'getwid' ) }
						</Button>							
					</ButtonGroup>
				</Fragment>
			);
		};

		return (
			<Fragment>
				<Inspector {...{
					...this.props,
					...{changeState},
					...{getState},
				}} key='inspector'/>
				<div
					className={ classnames(
						className,
					) }
				>			

					<div className="components-placeholder block-editor-inner-blocks__template-picker has-many-options">
						<div className="components-placeholder__label">
							<Dashicon icon="schedule" />{__('Templates Library', 'getwid')}
						</div>
						<div className="components-placeholder__instructions">{__('Select a template to insert layout on this page', 'getwid')}</div>
						<div className="components-placeholder__fieldset">
							
							{(this.state.showLoadTemplates) ? <Spinner /> : (
								<Button
									className={'open-modal-button'}
									isPrimary
									onClick={ () => {
										this.setState( { showModal : true } );
									}}
								>
									{ __( 'Insert Template', 'getwid' ) }
								</Button>
							)}														

							{ (getState('showModal') == true) ?
								<Modal
										className={`${className}__modal-templates`}
										title= {__( 'Templates Library', 'getwid' )}
										shouldCloseOnClickOutside={false}
										shouldCloseOnEsc={false}
										onRequestClose={ () => {
											this.setState( { showModal : false } );
										} }
									>
									<div className={`${className}__modal-toolbar`}>
										<ButtonGroup>
											<Button										
												className={'template-view-button'}
												isPrimary={(getState('templateView') == 'grid') ? true : undefined}
												isDefault={(getState('templateView') == 'list') ? true : undefined}
												onClick={ () => {
													this.setState( { templateView : 'grid' } );
												}}
											>
												<Dashicon icon="screenoptions" />
											</Button>

											<Button
												className={'template-view-button'}
												isPrimary={(getState('templateView') == 'list') ? true : undefined}
												isDefault={(getState('templateView') == 'grid') ? true : undefined}
												onClick={ () => {
													this.setState( { templateView : 'list' } );
												}}
											>
												<Dashicon icon="menu-alt" />
											</Button>																																							
										</ButtonGroup>
									</div>

									<div
										className={`${className}__wrapper`}
									>

										{renderCategoriesSelect()}
										{renderSearchField()}

										<div className={
											classnames(
												'template-library-list',
												`view-${this.state.templateView}`,
												{
													['loading-items'] : this.state.showLoadTemplates || this.state.pageTemplates.length == 0
												}
											)
										}>
											{(this.state.pageTemplates.length == 0 && this.state.showLoadTemplates == false) && (__( 'Not Found Templates', 'getwid' ))}
											{(this.state.showLoadTemplates) ? <Spinner /> : render_item()}						
										</div>
									</div>									
								</Modal>
							: null }
						</div>
					</div>
				</div>
			</Fragment>
		);	
	}
}

export default (Edit);