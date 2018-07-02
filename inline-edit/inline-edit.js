(function() {
  'use strict';

  var TOGGLE_EDIT_BUTTON = '<button name="toggleEditor" tabindex="0" role="button" aria-label="%INLINE_EDIT.EDIT%"' +
    ' title="%INLINE_EDIT.EDIT%" class="inline-edit-btn btn-sm btn-info" type="button">' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M15.8 3.2l-3-3c-.3-.3-.7-.3-1 0l-1.5 1.5 4.1' +
    ' 4.1 1.5-1.5c.2-.3.2-.8-.1-1.1zM2 10l-2 6 6-2 7-7-4-4-7 7zm3.5 3.1l-.9.3-2-2 .3-.9L9 4.4 11.6 7l-6.1 6.1z" fill="#FFFFFF"/></svg></button>';

  var SHOW_COMMENTS_BUTTON = '<button name="showComments" tabindex="0" role="button" aria-label="%INLINE_EDIT.CLICK_COMMENTS%"' +
    ' title="%INLINE_EDIT.CLICK_COMMENTS%" class="inline-approvals-btn btn-sm btn-info" type="button">' +
    '<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' +
    '<path class="st0" fill="#FFFFFF" d="M13 1.2c1 0 1.8.8 1.8 1.8v6c0 1-.8 1.8-1.8 1.8h-3c-.3 0-.5.1-.7.3l-3.1 2.4V12c0-.7-.5-1.2-1.2-1.2H3c-1 0-1.8-.8-1.8-1.8V3C1.2' +
    ' 2 2 1.2 3 1.2h10M13 0H3C1.3 0 0 1.3 0 3v6c0 1.6 1.3 3 3 3h2v4l5-4h3c1.7 0 3-1.4 3-3V3c0-1.7-1.3-3-3-3z"/>' +
    '<path class="st0" d="M4 4h8v1H4zM4 7h5v1H4z"  fill="#FFFFFF"/></svg></button>';

  var PAGE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' +
    '<path fill="#FFFFFF" d="M4 3h8v1H4zM4 5h8v1H4zM4 13h8v1H4zM4 11h8v1H4zM4 9h8v1H4zM4 7h8v1H4z"/><path fill="#FFFFFF" d="M2 1v15h12V1H2zm11 14H3V2h10v13z"/></svg>';

  var OPEN_PALETTE_BUTTON = '<button name="openPalette" tabindex="0" role="button" aria-label="%INLINE_EDIT.OPEN_PALETTE%" alt="%INLINE_EDIT.OPEN_PALETTE%"' +
    'title="%INLINE_EDIT.OPEN_PALETTE%" class= "inline-open-palette-btn btn-sm btn-info" type="button">' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title></title>' +
    '<path d="M7.25,1C10.7,1,13.5,3.44,13.5,6.44a3,3,0,0,1-3,3H9a2.24,2.24,0,0,0-2.21,2.21A2.37,2.37,0,0,0,7.3,13l0.08,0.11,0.07,0.07a0.38,0.38,0,0,1,0,' +
    '.08,0.24,0.24,0,0,1-.21.21A6.18,6.18,0,0,1,1,7.25,6.18,6.18,0,0,1,7.25,1m0-1a7.25,7.25,0,0,0,0,14.5,1.24,1.24,0,0,0,1.21-1.21,1,1,0,0,0-.32-0.81,1.44,1.44,0,0,1-' +
    '.32-0.8A1.24,1.24,0,0,1,9,10.47h1.45a4,4,0,0,0,4-4C14.5,2.9,11.28,0,7.25,0h0Z" ' +
    'transform="translate(0 0)" fill="#ffffff"/>' +
    '<circle cx="6" cy="3" r="1" fill="#ffffff"/><circle cx="9" cy="3" r="1" fill="#ffffff"/>' +
    '<circle cx="11" cy="5" r="1" fill="#ffffff"/><circle cx="4" cy="5" r="1" fill="#ffffff"/>' +
    '<path d="M4.5,8a1,1,0,1,1-1,1,1,1,0,0,1,1-1m0-1a2,2,0,1,0,2,2,2,2,0,0,0-2-2h0Z" transform="translate(0 0)" fill="#ffffff"/>' +
    '<path d="M19.77,5.73h0a0.8,0.8,0,0,0-1.09,0L8.55,14.61A1.65,1.65,0,0,0,8,16.06a1.94,1.94,0,0,0-1.34.19,1.75,1.75,0,0,0-.9,1.3v0.07a1.17,1.17,0,0,' +
    '1-.61.89,1.3,1.3,0,0,1-.39.14,0.34,0.34,0,0,0-.26.23,0.31,0.31,0,0,0,.09.33A3.08,3.08,0,0,0,6.7,20a3.12,3.12,0,0,0,1.53-.4,2.9,2.9,0,0,0,.91-0.79h0a1.68,1.68,0,0,0,' +
    '.31-1.31l0.19,0a1.65,1.65,0,0,0,1.24-.55L19.8,6.83A0.8,0.8,0,0,0,19.77,5.73ZM10.14,16.28a0.65,0.65,0,1,1-.93-0.92l1.3-1.14L11.28,15Zm1.8-2-0.68-.68,5.67-5Z" ' +
    'transform="translate(0 0)" fill="#ffffff"/></svg></button>';

  var APPROVAL_BUTTON = '<button name="approveBtn" tabindex="0" role="button" aria-label="%INLINE_EDIT.APPROVE%" title="%INLINE_EDIT.APPROVE%" ' +
    'class="inline-approvals-btn btn-sm btn-info" type="button">' +
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px"' +
    'viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">' +
    '<path  d="M2,16H1c-0.5,0-1-0.4-1-1l0-7c0-0.6,0.4-1,1-1h1c0.5,0,1,0.4,1,1v7C3,15.5,2.6,16,2,16z" fill="#ffffff"/>' +
    '<path  d="M13.9,15L13.9,15L5,14.2l0-5.3l0.4,0C8,8.7,10,6.5,10,3.9V2.5C10,2.2,10.2,2,10.5,2C10.8,2,11,2.2,11,2.5v3.7' +
    'c0,0.5,0.2,1,0.6,1.4C12,8,12.5,8.2,13,8.2c0,0,0,0,0,0c0.1,0,0.1,0,0.2,0l1.4-0.1c0.2,0,0.3,0.1,0.3,0.1c0,0,0.1,0.2,0.1,0.3' +
    'l-0.7,6.1C14.3,14.8,14.1,15,13.9,15 M13.9,16c0.7,0,1.3-0.5,1.4-1.2L16,8.7c0.1-0.8-0.6-1.6-1.4-1.6c0,0-0.1,0-0.1,0l-1.4,0.1' +
    'c0,0-0.1,0-0.1,0c-0.5,0-1-0.4-1-1V2.5C12,1.7,11.3,1,10.5,1C9.7,1,9,1.7,9,2.5v1.4c0,2.1-1.6,3.8-3.7,4l-0.4,0C4.4,8,4,8.4,4,8.9' +
    'v5.3c0,0.5,0.4,0.9,0.9,1l8.9,0.8C13.9,16,13.9,16,13.9,16L13.9,16z" fill="#ffffff"/></svg></button>';

  var LOCK_BUTTON =
    '<button name="lockBtn" tabindex="0" role="button" aria-label="%INLINE_EDIT.APPROVED%" title="%INLINE_EDIT.APPROVED%" ' +
    'class="inline-approvals-btn inline-lock-btn btn-sm btn-info" type="button">' +
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">' +
    '<path fill="#FFFFFF" d="M13,7.3V4.5C13,2,11,0,8.5,0S4,2,4,4.5v2.8c-0.6,0.9-1,2-1,3.2c0,3,2.5,5.5,5.5,5.5s5.5-2.5,5.5-5.5' +
    'C14,9.3,13.6,8.2,13,7.3z M8.5,1.2c1.8,0,3.3,1.5,3.3,3.4v1.6C10.9,5.4,9.8,5,8.5,5S6.1,5.4,5.2,6.1V4.5C5.2,2.7,6.7,1.2,8.5,1.2z" /></svg></button>';

  var MESSAGE_SAVE_ACTION = 'inlineedit.save';
  var MESSAGE_EDIT_TRANSFORMEDTEXT = 'inlineedit.transformedText';
  var TRANSFORMED_TEXT_FINISHED_EVENT = 'inlineedit.transformedText.finished';
  var EDIT_LINK = 'inlineedit.link';
  var EDIT_LINK_FINISHED = 'inlineedit.link.finished';
  var ELEMENT_HIGHLIGHT = 'inlineedit.highlight';
  var EDIT_MODE_EVENT = 'inlineedit.active';
  var SAVE_COMPLETE_EVENT = 'inlineedit.saveCompleted';
  var SAVE_FAILED_EVENT = 'inlineedit.saveFailed';
  var ELEMENT_SCROLL_TO_EVENT = 'inlineedit.scrollTo';
  var OPEN_EDITOR = 'inlineedit.openEditor';
  var OPEN_PALETTE = 'inlineedit.openPalette';
  var INLINE_EDIT_CLOSE_PALETTE = 'inlineedit.closePalette';
  var APPROVE = 'inlineedit.approve';
  var UNLOCK = 'inlineedit.unlock';
  var PAGE_CHANGED = 'inlineedit.pageChanged';
  var CONTENT_KEY = 'wch-content-key';
  var CONTENT_TYPE = 'wch-content-type';
  var PALETTE_TYPE = 'wch-palette-type';
  var CONTENT_TRANSFORMED = 'wch-content-transformed';
  var CONTENT_ID = 'wch-content-id';
  var CONTENT_NAME = 'wch-content-name';
  var CONTENT_ACCESSOR = 'wch-content-accessor';
  var CONTENT_REFERENCE_CLASS = 'wch-edit-reference';
  var EDIT_MODE_CLASS = 'wch-edit-mode';
  var EDIT_ELEMENT_CLASS = 'wch-edit-element';
  var CONTENT_BORDER_CLASS = 'wch-inline-edit-border';
  var CONTENT_REF_CLASS = 'inline-banner-ref';
  var CONTENT_REF_MARKER = '%INLINE_EDIT.REF%';
  var CONTENT_BANNER_NAME_CLASS = 'inline-banner-name-span';
  var CONTENT_BANNER_NAME_CLASS_SELECTOR = '.' + CONTENT_BANNER_NAME_CLASS;
  var CONTENT_BANNER_CLASS = 'inline-banner-span';
  var CONTENT_BANNER_CLASS_SELECTOR = '.' + CONTENT_BANNER_CLASS;
  var CONTENT_BANNER_CONTAINER_CLASS = 'inline-banner-span-container';
  var SHOW_MEDIA_BANNER_CONTAINER_CLASS = 'show-inline-media-banner-container';
  var SHOW_MEDIA_BANNER_CLASS = 'show-inline-media-banner';
  var IMAGE_BANNER_CLASS = 'inline-media-banner-span';
  var MEDIA_BANNER_WRAPPER_CLASS = 'inline-media-banner-wrapper';
  var MEDIA_BANNER_CONTAINER = 'inline-media-banner-container';
  var MEDIA_BANNER_CLASS_SELECTOR = '.' + MEDIA_BANNER_CONTAINER;
  var PALETTE_BUTTON_CLASS = 'inline-open-palette-btn';
  var PALETTE_BUTTON_CLASS_SELECTOR = '.' + PALETTE_BUTTON_CLASS;
  var EDIT_ELEMENT_SELECTED_CLASS = 'wch-edit-selected';
  var EDIT_LINK_OVERRIDE_SELECTED_BACKGROUND_CLASS = 'wch-edit-selected-link-background';
  var EDIT_ELEMENT_SELECTED_CLASS_SELECTOR = '.' + EDIT_ELEMENT_SELECTED_CLASS;
  var LOCKED_ICON_CLASS = 'show-locked-icon';
  var PAGE_CLASS = 'page';
  var PAGE_ELEMENT = 'wch-page';
  var WCH_PAGE_CLASS = 'wch-edit-page';
  var WCH_PAGE_CLASS_SELECTOR = '.wch-edit-page';
  var WCH_PAGE_ID = 'wch-page-id';
  var PAGE_SELECTOR = '.' + PAGE_CLASS + '.' + CONTENT_BANNER_CLASS;
  var HIGH_CONTRAST_CLASS = 'high-contrast';
  var CONTENT_EDITABLE = 'contenteditable';
  var FORMATTED_TEXT = 'formattedtext';
  var WCH_CONFIG = 'wch-config';
  var EDIT_MODE_CSS_LINK = 'authoring-sites-ui/inline-edit/inline-edit.css';
  var CKEDITOR_JS_LINK = 'auth/ckeditor/ckeditor.js';
  var CONTENT_TYPE_TEXT = 'text';
  var CONTENT_TYPE_REF = 'reference';
  var CONTENT_TYPE_LINK = 'link';
  var CONTENT_TYPE_IMG = 'image';
  var CONTENT_TYPE_VID = 'video';
  var LINK_URL = 'wch-link-url';
  var LINK_TEXT = 'wch-link-text';
  var LINK_DESCRIPTION = 'wch-link-description';
  var LINKS_SELECTOR = '[wch-content-type=\"link\"]';
  var IS_LINK_CLONE = 'wch-is-link-clone';
  var ORIGINAL_DISPLAY_VALUE = 'wch-original-display';
  var SAVE = 'save';
  var TABINDEX = 'tabindex';
  var COMMENTS = 'comments';
  var IN_REVIEW = 'in-review';
  var APPROVED = 'approved';
  var IN_PROGRESS = 'in-progress';
  var PAGE = 'page';
  var PALETTE_BUTTON_ACTIVE = 'palette-button-active';
  var ckeditorCustomStyles;
  var KEY_ENTER = 13;
  var EVENT_TYPE_CLICK = 'click';
  var KEY_LEFT_ARROW = 37;
  var KEY_DOWN_ARROW = 40;
  var TEXT_NODE = 3;
  var sitesApprovalToggleEnabled = false;
  var CONTENT_REVIEW = 'review';
  var DRAFT_SUFFIX = ':draft';
  var attributesToTranslate = ['aria-label', 'alt', 'title'];

  require('./ckeditor.css').then(function(styles) {
    ckeditorCustomStyles = styles;
  });

  // Load the inline-edit.css and CKEditor dynamically
  require(WCH_CONFIG)
    .then(function(config) {
      /* istanbul ignore else  */
      if (config && config.authoringUIBaseUrl && config.authoringUIBaseUrl.href) {
        var script = window.document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', config.authoringUIBaseUrl.href + CKEDITOR_JS_LINK);
        window.document.body.appendChild(script);
        script.addEventListener('load', function() {
          CKEDITOR.disableAutoInline = true;
        });
        var link = window.document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', config.authoringUIBaseUrl.href + EDIT_MODE_CSS_LINK);
        window.document.body.appendChild(link);
      }
    });

  var editMode = false;
  var editModeEnabledByUser = false;
  var formattedTextChangeInProgress = false;
  var inlineEditTranslation;

  function registerComponentForEditing(nativeElement, accessorString, renderingContextObservable) {
    _addListenerForEditMode();
    // In case of switching between pages, editmode is still on, but need to enable the styles
    _toggleEditClass();
    var subscription = renderingContextObservable.subscribe(function(renderingContext) {
      try {
        console.log('RAVE nativeElement: ', nativeElement);
        console.log('RAVE accessorString: ', accessorString);
        console.log('RAVE renderingContextObservable: ', renderingContextObservable);
        if (accessorString) {
          _enableInlineEditing(nativeElement, renderingContext, accessorString);
        }
      } catch (err) {
        console.log('Can not enable inline editing for ', nativeElement);
      }
    });

    var element = nativeElement;

    function _unregister() {
      subscription.unsubscribe();
      _disableInlineTextEditing(element);
      _disableInlineEditAttributes(element);
      _disableInlineRefEditing(element);
      _disableEditingOtherTypes(element);
      _disableInlineMediaEditing(element);
    }

    /*istanbul ignore next */
    function _addListener() {}
    /*istanbul ignore next */
    function _removeListener() {}

    // register our event object
    var result = {
      'addListener': _addListener,
      'removeListener': _removeListener,
      'dispose': _unregister
    };
    return result;
  }

  // accessorString will be of the format
  //    * elements.<elementkeyName>.<valueKey>
  //    * elements.<elementkeyName>.values[<idx>]
  //    * contentAttribute   (eg name, description)
  function _extractElementKey(accessorString) {
    if (accessorString) {
      var keyArr = accessorString.split('.');
      var key = keyArr.length === 1 ? accessorString : keyArr[1];
      return key;
    } else {
      return '';
    }
  }

  function _enableInlineEditing(element, renderingContext, accessor) {
    if (isPage()) {
      updatePageBanner(renderingContext);
    }
    var key = _extractElementKey(accessor);
    var contentElement = renderingContext.elements[key];
    if (contentElement) {
      var type = contentElement.elementType;
      var isSpan = element.nodeName && element.nodeName.toLowerCase() === 'span';
      var id = determineIdToUse(renderingContext.id, renderingContext.draftId);
      var draftStatus;
      var name = renderingContext.name;
      if (type === CONTENT_TYPE_REF) {
        _checkStatusAndEnableContent();
      } else {
        _checkStatusAndEnable();
      }
      if (inlineEditTranslation) {
        _updateStrings(element);
      }
    }

    function isPage() {
      if (renderingContext.kind &&
        renderingContext.kind.length > 0 &&
        renderingContext.kind.indexOf(PAGE) === 0) {
        return true;
      } else {
        return false;
      }
    }

    function removeDraftFromID(pageId) {
      if (pageId &&
        pageId.indexOf(DRAFT_SUFFIX) !== -1) {
        pageId = pageId.substring(0, pageId.indexOf(DRAFT_SUFFIX));
      }
      return pageId;
    }

    function updatePageBanner(context) {
      var pagebanner = window.document.querySelector(WCH_PAGE_CLASS_SELECTOR);
      var pageId, pageIdWithoutDraft, newPageId;
      if (pagebanner) {
        pageId = pagebanner.getAttribute(WCH_PAGE_ID);
        pageIdWithoutDraft = removeDraftFromID(pageId);
        newPageId = removeDraftFromID(context.id);
        var pageElement = window.document.querySelector(PAGE_ELEMENT);
        if (pageElement && (pageIdWithoutDraft === newPageId)) {
          _addBanner(pageElement, pageId, context.name, null, PAGE, context.draftStatus);
        }
      }
    }

    function _checkStatusAndEnableContent() {
      var refValue = _getValueByAccessor(contentElement, accessor);
      draftStatus = refValue ? refValue.draftStatus : '';
      if (draftStatus === APPROVED) {
        _enableContentEditing();
      } else {
        _enableAccessorAttributes(element, key, id, name);
        _addNonVisibleInfo(element, contentElement.value, renderingContext.typeId);
        _enableInlineEditAttributes(element, type, accessor);
        _enableTypeSpecificEditing();
      }
    }

    function _checkStatusAndEnable() {
      draftStatus = renderingContext.draftStatus;
      if (draftStatus !== APPROVED) {
        // Anything that is in draft and part of a project cannot be edited
        if (draftStatus === IN_PROGRESS && renderingContext.projectId) {
          return;
        }
        _enableAccessorAttributes(element, key, id, name);
        _addNonVisibleInfo(element, contentElement.value, renderingContext.typeId);
        _enableInlineEditAttributes(element, type, accessor);
        _enableTypeSpecificEditing();
      }
      // incorrect test coverage failure if use else if here
      if (draftStatus === APPROVED) {
        _disableInlineEditAttributes(element);
        _disableInlineTextEditing(element);
        _disableEditingOtherTypes(element);
      }
    }

    function _enableTypeSpecificEditing() {
      /*jshint maxcomplexity:8 */
      if (type === CONTENT_TYPE_TEXT || (type === FORMATTED_TEXT && !isSpan)) {
        _enableInlineTextEditing(element);
      } else if (type === CONTENT_TYPE_REF) {
        _enableContentEditing();
      } else if (type === CONTENT_TYPE_LINK) {
        _enableLinkEditing();
      } else if ((type === CONTENT_TYPE_IMG) || (type === CONTENT_TYPE_VID)) {
        _enableMediaEditing();
      } else {
        _enableEditingOtherTypes(element);
      }
    }

    function _enableLinkEditing() {
      /*jshint maxcomplexity:6 */
      if (!element.hasAttribute(LINK_TEXT)) {
        var linkValue = _getValueByAccessor(contentElement, accessor);
        _ensureLinkElementHiddenIfSiblingIsClone();
        element.setAttribute(LINK_TEXT, linkValue.linkText !== undefined ? linkValue.linkText : '');
        element.setAttribute(LINK_URL, linkValue.linkURL !== undefined ? linkValue.linkURL : '');
        element.setAttribute(LINK_DESCRIPTION, linkValue.linkDescription !== undefined ? linkValue.linkDescription : '');

        if (editMode) {
          _toggleLink(element);
        }
      }

      function _ensureLinkElementHiddenIfSiblingIsClone() {
        var nextSibling = element.nextElementSibling;
        var previousSibling = element.previousElementSibling;
        if (nextSibling && nextSibling.getAttribute(IS_LINK_CLONE) === 'true') {
          element.style.display = 'none';
        } else if (previousSibling && previousSibling.getAttribute(IS_LINK_CLONE) === 'true') {
          element.style.display = 'none';
        } else if (previousSibling && previousSibling.previousElementSibling && previousSibling.previousElementSibling.getAttribute(IS_LINK_CLONE) === 'true') {
          element.style.display = 'none';
        } else if (nextSibling && nextSibling.nextElementSibling && nextSibling.nextElementSibling.getAttribute(IS_LINK_CLONE) === 'true') {
          element.style.display = 'none';
        }
      }
    }

    function _enableContentEditing() {
      _enableInlineRefEditing(element);
      element.classList.add(CONTENT_REFERENCE_CLASS);
      var refValue = _getValueByAccessor(contentElement, accessor);
      var name = refValue && refValue.name ? refValue.name : '';
      var refId = _getContentId(refValue, id);
      var status = refValue && refValue.draftStatus ? refValue.draftStatus : '';
      _addBanner(element, refId, name, key, CONTENT_TYPE_REF, status);
    }

    function _enableMediaEditing() {
      _addMediaButtons(element);
      _enableInlineMediaEditing(element);
    }
  }

  function _showMediaBanner(event) {
    var banner = event.currentTarget.previousElementSibling;
    if (banner && !banner.classList.contains(SHOW_MEDIA_BANNER_CONTAINER_CLASS)) {
      banner.classList.add(SHOW_MEDIA_BANNER_CONTAINER_CLASS);
      banner.firstElementChild.classList.add(SHOW_MEDIA_BANNER_CLASS);
    }
  }

  function _hideMediaBanner(event) {
    var banner = event.currentTarget.previousElementSibling;
    if (banner && banner.classList.contains(SHOW_MEDIA_BANNER_CONTAINER_CLASS)) {
      event.currentTarget.previousElementSibling.classList.remove(SHOW_MEDIA_BANNER_CONTAINER_CLASS);
      banner.firstElementChild.classList.remove(SHOW_MEDIA_BANNER_CLASS);
    }
  }

  function determineIdToUse(id, draftId) {
    if (draftId) {
      id = draftId;
    }
    return id;
  }

  function _getContentId(refValue, id) {
    if (!refValue) {
      return id;
    } else {
      return refValue.draftId ? refValue.draftId : refValue.id;
    }
  }

  function _getValueByAccessor(elementArr, accessor) {
    var keys = accessor.split('.');
    return _extractValue(elementArr, keys[keys.length - 1]);
  }

  function _extractValue(property, keyValue) {
    var keys = keyValue.split('[');
    if (keys.length === 1) {
      return property[keyValue] ? property[keyValue] : property;
    } else {
      var arrayIdxString = keys[1].split(']');
      var arrayIdx = parseInt(arrayIdxString[0], 10);
      if (property[keys[0]]) {
        return property[keys[0]][arrayIdx];
      } else {
        return null;
      }
    }
  }

  function _enableAccessorAttributes(element, key, id, name) {
    element.setAttribute(CONTENT_KEY, key);
    element.setAttribute(CONTENT_ID, id);
    element.setAttribute(CONTENT_NAME, name);
  }

  function _enableInlineEditAttributes(element, type, accessor) {
    element.setAttribute(CONTENT_TYPE, type);
    element.setAttribute(CONTENT_ACCESSOR, accessor);
    if (editMode) {
      element.setAttribute(TABINDEX, '0');
    }
    if (type !== CONTENT_TYPE_REF) {
      element.setAttribute(CONTENT_EDITABLE, editMode);
    }
  }

  function _addNonVisibleInfo(element, contentValue, typeId) {
    element.contentValue = contentValue;
    element.contentTypeId = typeId;
    element.classList.add(EDIT_ELEMENT_CLASS);
  }

  function _disableInlineEditAttributes(element) {
    element.removeAttribute(CONTENT_EDITABLE);
    element.removeAttribute(CONTENT_KEY);
    element.removeAttribute(CONTENT_TYPE);
    element.removeAttribute(CONTENT_ID);
    element.removeAttribute(CONTENT_ACCESSOR);
    element.removeAttribute(CONTENT_TRANSFORMED);
    element.classList.remove(EDIT_ELEMENT_CLASS);
  }

  function _enableInlineTextEditing(element) {
    element.addEventListener('focus', _editingTextStart);
    element.addEventListener('click', _handleClick);
    element.addEventListener('blur', _editingTextEnd);
  }

  function _enableTransformTextEditing(element) {
    _setContentEditable(element, false);
    element.setAttribute(CONTENT_TRANSFORMED, 'true');
    element.removeEventListener('click', _handleClick);
    element.removeEventListener('blur', _editingTextEnd);
    element.addEventListener('keydown', _showTransformedTextDialog);
    element.addEventListener('click', _showTransformedTextDialog);
  }

  function _disableInlineTextEditing(element) {
    element.removeEventListener('focus', _editingTextStart);
    element.removeEventListener('click', _handleClick);
    element.removeEventListener('blur', _editingTextEnd);
    element.removeEventListener('keydown', _showTransformedTextDialog);
    element.removeEventListener('click', _showTransformedTextDialog);
  }

  function _handleClick(event) {
    if (editMode) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function _enableInlineMediaEditing(element) {
    element.addEventListener('focus', _showMediaBanner);
    element.addEventListener('mouseover', _showMediaBanner);
    element.addEventListener('mouseout', _hideMediaBanner);
    element.addEventListener('blur', _hideMediaBanner);
  }

  function _disableInlineMediaEditing(element) {
    element.removeEventListener('focus', _showMediaBanner);
    element.removeEventListener('mouseover', _showMediaBanner);
    element.removeEventListener('mouseout', _hideMediaBanner);
    element.removeEventListener('blur', _hideMediaBanner);
  }

  function _enableInlineRefEditing(element) {
    element.addEventListener('focus', _editingRefStart);
    element.addEventListener('mouseover', _setBannerWidth);
    element.addEventListener('blur', _editingRefEnd);
  }

  function _disableInlineRefEditing(element) {
    element.removeEventListener('focus', _editingRefStart);
    element.removeEventListener('blur', _editingRefEnd);
    element.removeEventListener('mouseover', _setBannerWidth);
  }

  function _enableEditingOtherTypes(element) {
    element.addEventListener('focus', _editingOtherTypeStart);
    element.addEventListener('click', _openEditorAndShowElement);
    element.addEventListener('keydown', _openEditorAndShowElement);
    element.addEventListener('blur', _editingOtherTypeEnd);
  }

  function _disableEditingOtherTypes(element) {
    element.removeEventListener('focus', _editingOtherTypeStart);
    element.removeEventListener('click', _openEditorAndShowElement);
    element.removeEventListener('keydown', _openEditorAndShowElement);
    element.removeEventListener('blur', _editingOtherTypeEnd);
  }

  function _editingRefStart(event) {
    event.stopPropagation();
    event.preventDefault();
    var editableElements = window.document.querySelectorAll(EDIT_ELEMENT_SELECTED_CLASS_SELECTOR);
    for (var i = 0; i < editableElements.length; i++) {
      editableElements[i].classList.remove(EDIT_ELEMENT_SELECTED_CLASS);
    }
    var editing = event.currentTarget.classList.contains(EDIT_ELEMENT_SELECTED_CLASS);
    if (editMode && !editing) {
      event.currentTarget.classList.add(EDIT_ELEMENT_SELECTED_CLASS);
    }
    _setBannerWidth(event);
  }

  function _setBannerWidth(event) {
    var banners = event.currentTarget.querySelectorAll(CONTENT_BANNER_CLASS_SELECTOR);
    for (var i = 0; i < banners.length; i++) {
      banners[i].style.maxWidth = banners[i].parentElement.nextElementSibling.getBoundingClientRect().width + 'px';
    }
  }

  function _editingRefEnd(event) {
    if (event.relatedTarget === null || event.relatedTarget.name !== 'toggleEditor') {
      event.currentTarget.classList.remove(EDIT_ELEMENT_SELECTED_CLASS);
    }
  }

  function _extractMultiValueIndex(accessor) {
    var index;
    if (accessor.indexOf('[') > 0) {
      var startIndex = accessor.indexOf('[') + 1;
      var lengthOfIndex = accessor.indexOf(']') - (startIndex);
      index = parseInt(accessor.substr(startIndex, lengthOfIndex), 10);
    }
    return index;
  }

  function _editingOtherTypeStart(event) {
    var element = event.currentTarget;
    event.stopPropagation();
    event.preventDefault();
    var editing = element.classList.contains(EDIT_ELEMENT_SELECTED_CLASS);
    if (editMode && !editing) {
      _addElementSelectedStyling(element);
      element.setAttribute(CONTENT_EDITABLE, false);
    }
  }

  function _openEditorAndShowElement(event) {
    if (editMode && (event.type === EVENT_TYPE_CLICK || event.keyCode === KEY_ENTER)) {
      event.stopPropagation();
      event.preventDefault();
      event.currentTarget.setAttribute(CONTENT_EDITABLE, false);
      _sendHighlightMessage(event, true);
    }
  }

  function _editingOtherTypeEnd(event) {
    var element = event.currentTarget;
    element.setAttribute(CONTENT_EDITABLE, editMode);
    _removeSelectedClassForNonTransformed(element);
  }

  function _addElementSelectedStyling(element) {
    element.classList.add(EDIT_ELEMENT_SELECTED_CLASS);
  }

  function _editingTextStart(event) {
    var element = event.currentTarget;
    event.stopPropagation();
    event.preventDefault();
    var editing = element.classList.contains(EDIT_ELEMENT_SELECTED_CLASS);
    if (editMode && !editing) {
      var text = _getTextFromTextNodes(element);
      var transformedText = (text !== element.contentValue && element.getAttribute(CONTENT_TYPE) !== FORMATTED_TEXT);
      if (!transformedText) {
        _sendHighlightMessage(event);
      }
      if (transformedText) {
        _enableTransformTextEditing(element);
        return;
      }
      _toggleEditingOfSurroundingElements(element, false);
      _addElementSelectedStyling(element);
      if (element.getAttribute(CONTENT_TYPE) === FORMATTED_TEXT && !formattedTextChangeInProgress) {
        _showCKEditor();
      } else {
        // This is plain text, so add the keydown and paste listeners
        element.addEventListener('keydown', _keydown);
        element.addEventListener('paste', _paste);
      }
    }

    function _showCKEditor() {
      var textBeforeAnyChanges = '';
      CKEDITOR.addCss(ckeditorCustomStyles);
      CKEDITOR.inline(element, {
        removePlugins: 'ibmstatusmessage',
        on: {
          change: function() {
            var currentText = this.getData();
            if (!formattedTextChangeInProgress) {
              _toggleInlineEditingForOtherElements(false);
              formattedTextChangeInProgress = true;
            } else if (formattedTextChangeInProgress && currentText === textBeforeAnyChanges) {
              _toggleInlineEditingForOtherElements(true);
              formattedTextChangeInProgress = false;
            }
          },
          instanceReady: function() {
            this.dataProcessor.writer.setRules('p', {
              breakAfterClose: false
            });
            textBeforeAnyChanges = this.getData();
          },
          blur: function() {
            var newMarkup = this.getData();
            if (newMarkup !== textBeforeAnyChanges) {
              newMarkup = newMarkup.replace(/\sdir=("ltr"|"rtl")/g, '');
              sendSaveActionMessage(element, newMarkup);
              console.log('InlineEdit: Sent update event for formatted text');
            } else {
              formattedTextChangeInProgress = false;
            }
            var that = this;
            setTimeout(function() {
              that.destroy();
            }, 0);
          }
        }
      });

      function _toggleInlineEditingForOtherElements(isContentEditable) {
        var editableElements = window.document.querySelectorAll('[' + CONTENT_TYPE + ']');
        for (var idx = 0; idx < editableElements.length; idx++) {
          if ((editableElements[idx].getAttribute(CONTENT_TYPE) === CONTENT_TYPE_TEXT ||
              editableElements[idx].getAttribute(CONTENT_TYPE) === FORMATTED_TEXT ||
              editableElements[idx].getAttribute(CONTENT_TYPE) === CONTENT_TYPE_LINK) &&
            editableElements[idx] !== element) {
            editableElements[idx].setAttribute(CONTENT_EDITABLE, isContentEditable);
          }
        }
      }
    }
  }

  function _showTransformedTextDialog(event) {
    if (editMode && (event.type === EVENT_TYPE_CLICK || event.keyCode === KEY_ENTER)) {
      event.preventDefault();
      event.stopPropagation();
      var element = event.currentTarget;
      var editing = element.classList.contains(EDIT_ELEMENT_SELECTED_CLASS);
      if (!editing) {
        element.classList.add(EDIT_ELEMENT_SELECTED_CLASS);
      }
      element.setAttribute(CONTENT_EDITABLE, false);
      console.log('InlineEdit: Opening transformed text dialog');
      window.parent.postMessage({
        action: MESSAGE_EDIT_TRANSFORMEDTEXT,
        contentId: element.getAttribute(CONTENT_ID),
        contentName: element.getAttribute(CONTENT_NAME),
        accessor: element.getAttribute(CONTENT_ACCESSOR),
        contentValue: element.contentValue,
        contentTypeId: element.contentTypeId
      }, '*');
    }
  }

  function _keydown(event) {
    if (event.keyCode === KEY_ENTER) {
      event.preventDefault();
    } else if (isArrowKey(event.keyCode)) {
      event.stopPropagation();
    }
  }

  function isArrowKey(keyCode) {
    return keyCode >= KEY_LEFT_ARROW && keyCode <= KEY_DOWN_ARROW;
  }

  /*istanbul ignore next */
  function _paste(event) {
    event.preventDefault();
    var text = event.clipboardData.getData('text/plain');
    window.document.execCommand('insertText', false, text);
  }

  function _toggleEditingOfSurroundingElements(element, editable) {
    var children = element.children;
    var parent = element.parentElement;
    _setContentEditable(parent, editable);
    var i = 0;
    if (!children) {
      return;
    }
    while (i < children.length) {
      _setContentEditable(children[i], editable);
      i++;
    }
  }

  function _setContentEditable(element, isEditable) {
    if (element && element.hasAttribute(CONTENT_EDITABLE)) {
      element.setAttribute(CONTENT_EDITABLE, isEditable);
    }
  }

  function _getTextFromTextNodes(element) {
    var sibling = element.firstChild;
    var values = [];
    var completeInnerText = '';
    while (sibling) {
      if (sibling.nodeType === TEXT_NODE) {
        values.push(sibling.data);
      }
      sibling = sibling.nextSibling;
    }
    completeInnerText = values.join('').trim();
    return completeInnerText;
  }

  function _editingTextEnd(event) {
    var element = event.currentTarget;
    _removeSelectedClassForNonTransformed(element);
    if (editMode && !element.getAttribute(CONTENT_TRANSFORMED) && element.getAttribute(CONTENT_TYPE) !== FORMATTED_TEXT) {
      // Remove the listeners
      element.removeEventListener('keydown', _keydown);
      element.removeEventListener('paste', _paste);
      _toggleEditingOfSurroundingElements(element, true);
      var text = _getTextFromTextNodes(element);
      if (text !== element.contentValue) {
        element.contentValue = text;
        sendSaveActionMessage(element, text);
        console.log('InlineEdit: Sent update event for plain text');
      }
    } else if (!element.getAttribute(CONTENT_TRANSFORMED)) {
      event.currentTarget.setAttribute(CONTENT_EDITABLE, editMode);
    }
  }

  function _removeSelectedClassForNonTransformed(element) {
    if (!element.getAttribute(CONTENT_TRANSFORMED)) {
      element.classList.remove(EDIT_ELEMENT_SELECTED_CLASS);
    }
  }

  function sendSaveActionMessage(element, newText) {
    var msg = {
      action: MESSAGE_SAVE_ACTION,
      elementKey: element.getAttribute(CONTENT_KEY),
      elementType: element.getAttribute(CONTENT_TYPE),
      contentId: element.getAttribute(CONTENT_ID),
      contentName: element.getAttribute(CONTENT_NAME),
      accessor: element.getAttribute(CONTENT_ACCESSOR),
      value: newText
    };
    window.parent.postMessage(msg, '*');
    _toggleEditMode(false);
  }

  function _addListenerForEditMode() {
    // console.log('RAVE in _addListenerForEditMode');
    window.addEventListener('message', _handleMessageEvents, false);
  }

  function _handleMessageEvents(msg) {
    /*jshint maxcomplexity:8 */
    if (msg.data.action === EDIT_MODE_EVENT) {
      _handleEditModeEvent(msg.data);
    } else if ((msg.data.action === TRANSFORMED_TEXT_FINISHED_EVENT)) {
      _handleTransformTextEditFinish();
    } else if (_isSaveEvent()) {
      _toggleEditMode(editModeEnabledByUser);
      formattedTextChangeInProgress = false;
    } else if (msg.data.action === ELEMENT_SCROLL_TO_EVENT) {
      _smoothScrollToTargetDom(msg);
    } else if (msg.data.action === PAGE_CHANGED) {
      _handlePageChangedEvent(msg.data);
    } else if (msg.data.action === EDIT_LINK_FINISHED) {
      _handleLinkEditFinished();
    } else if (msg.data.action === INLINE_EDIT_CLOSE_PALETTE) {
      _removeActivePaletteState();
    }

    function _handleLinkEditFinished() {
      var element = window.document.querySelector(EDIT_ELEMENT_SELECTED_CLASS_SELECTOR);
      if (msg.data.result === SAVE) {
        element.setAttribute(LINK_TEXT, msg.data.properties.linkText);
        element.setAttribute(LINK_URL, msg.data.properties.linkURL);
        element.setAttribute(LINK_DESCRIPTION, msg.data.properties.linkDescription);
        element.innerHTML = msg.data.properties.linkText;
      }
      element.classList.remove(EDIT_ELEMENT_SELECTED_CLASS);
      element.classList.remove(EDIT_LINK_OVERRIDE_SELECTED_BACKGROUND_CLASS);
      // Firefox ESR was not refocusing without a timeout
      setTimeout(function() {
        element.focus();
      }, 500);
    }

    function _toggleEditableLinksOnPageChange() {
      if (editMode) {
        _toggleEditingOfLinks();
      }
    }

    function _isSaveEvent() {
      var result = false;
      if (msg.data.action === SAVE_COMPLETE_EVENT || msg.data.action === SAVE_FAILED_EVENT) {
        result = true;
      }
      return result;
    }

    function _setPage(pageValue) {
      var pageElement = window.document.querySelector(PAGE_ELEMENT);
      if (pageElement && pageValue) {
        pageElement.classList.add(WCH_PAGE_CLASS);
        pageElement.setAttribute(WCH_PAGE_ID, pageValue.contentId);
        _addBanner(pageElement, pageValue.contentId, pageValue.name, null, PAGE, pageValue.draftStatus);
      }
    }

    function _handleEditModeEvent(data) {
      _setHighContrastMode(data.highContrastMode);
      _toggleEditMode(data.value);
      editModeEnabledByUser = data.value;
      sitesApprovalToggleEnabled = data.sitesApprovalToggleEnabled;
      _setPage(data.page);
      inlineEditTranslation = data.translation;
      _updateStrings();
    }

    function _handlePageChangedEvent(data) {
      _toggleEditableLinksOnPageChange();
      _toggleEditableNonTextNonLinkElementsOnPageChange();
      sitesApprovalToggleEnabled = data.sitesApprovalToggleEnabled;
      _setPage(data.page);
      inlineEditTranslation = data.translation;
      _updateStrings();
    }
  }

  function _removeActivePaletteState() {
    var activePaletteButton = window.document.querySelector('[' + PALETTE_BUTTON_ACTIVE + ']');
    if (activePaletteButton) {
      activePaletteButton.disabled = false;
      activePaletteButton.removeAttribute(PALETTE_BUTTON_ACTIVE);
    }
  }

  function _updateStrings(element) {
    var searchScope = window.document;
    if (element) {
      searchScope = element;
    }
    var domsWithTranslationMarkers = searchScope.querySelectorAll('[aria-label*="%INLINE_EDIT."]');
    if (domsWithTranslationMarkers) {
      for (var i = 0; i < domsWithTranslationMarkers.length; i++) {
        _replaceWithTranslations(domsWithTranslationMarkers[i]);
      }
    }
  }

  function _replaceWithTranslations(dom) {
    attributesToTranslate.forEach(function(attr) {
      var translatedAttr = _getTranslatedIfRequired(dom.getAttribute(attr));
      if (translatedAttr) {
        dom.setAttribute(attr, translatedAttr);
      }
    });

    var innerHTML = _getTranslatedIfRequired(dom.innerHTML);
    if (innerHTML) {
      dom.innerHTML = innerHTML;
    }
  }

  function _getTranslatedIfRequired(stringMarkedForTranslation) {
    var translatedString;
    var p = /%INLINE_EDIT.(\w+)%/g;
    if (stringMarkedForTranslation) {
      var keys = stringMarkedForTranslation.match(p);
      if (keys && keys.length > 0) {
        translatedString = _replaceString(stringMarkedForTranslation, keys[0]);
      }
    }
    return translatedString;
  }

  function _replaceString(stringWithMarkers, key) {
    var translatedString = stringWithMarkers;
    var translationKey = key.substr(1, key.length - 2);
    if (inlineEditTranslation) {
      var translation = inlineEditTranslation[translationKey];
      if (translation) {
        var replacePattern = new RegExp(key, 'g');
        translatedString = translatedString.replace(replacePattern, translation);
      }
    }
    return translatedString;
  }

  function _toggleEditableNonTextNonLinkElementsOnPageChange() {
    var editableElements = window.document.querySelectorAll('[' + CONTENT_TYPE + ']');
    for (var idx = 0; idx < editableElements.length; idx++) {
      if (_isOtherType(editableElements[idx])) {
        _toggleEditingOfOtherTypeElements(editableElements[idx]);
      }
    }
  }

  function _toggleEditingOfOtherTypeElements(element) {
    element.setAttribute(CONTENT_EDITABLE, true);
    element.classList.add(EDIT_ELEMENT_CLASS);
  }

  function _isOtherType(element) {
    var type = element.getAttribute(CONTENT_TYPE);
    return (type !== CONTENT_TYPE_REF) && (type !== CONTENT_TYPE_LINK) && (type !== CONTENT_TYPE_TEXT) && (type !== FORMATTED_TEXT);
  }

  function _setHighContrastMode(mode) {
    if (mode) {
      window.document.body.classList.add(HIGH_CONTRAST_CLASS);
    } else {
      window.document.body.classList.remove(HIGH_CONTRAST_CLASS);
    }
  }

  function _toggleEditingOfLinks() {
    var editableLinks = window.document.querySelectorAll(LINKS_SELECTOR);
    for (var idx = 0; idx < editableLinks.length; idx++) {
      _toggleLink(editableLinks[idx]);
    }
  }

  function _handleTransformTextEditFinish() {
    var element = window.document.querySelector('[' + CONTENT_TRANSFORMED + ']' + EDIT_ELEMENT_SELECTED_CLASS_SELECTOR);
    if (element) {
      element.classList.remove(EDIT_ELEMENT_SELECTED_CLASS);
      element.setAttribute(CONTENT_EDITABLE, true);
      // Firefox ESR was not refocusing without a timeout
      setTimeout(function() {
        element.focus();
      }, 500);
    }
  }

  function _toggleEditMode(isEditMode) {
    if (isEditMode !== editMode) {
      editMode = isEditMode;
      _toggleEditClass();
      _toggleTabIndex(isEditMode);
      _toggleTypeSpecificBehaviour(isEditMode);
    }
  }

  function _toggleTypeSpecificBehaviour(isEditMode) {
    var editableElements = window.document.querySelectorAll('[' + CONTENT_TYPE + ']');
    for (var idx = 0; idx < editableElements.length; idx++) {
      if (editableElements[idx].getAttribute(CONTENT_TYPE) === CONTENT_TYPE_LINK) {
        _toggleLink(editableElements[idx]);
      } else if (editableElements[idx].getAttribute(CONTENT_TYPE) !== CONTENT_TYPE_REF) {
        editableElements[idx].setAttribute(CONTENT_EDITABLE, isEditMode);
      }
    }
  }

  function _toggleLink(element) {
    if (editMode) {
      _showCloneOfLinkAndHideOriginal(element);
    } else {
      _revertLink(element);
    }
  }

  function _showCloneOfLinkAndHideOriginal(element) {
    if (_checkIfCloneExists()) {
      return;
    }
    var displayValue = element.style.display !== '' ? element.style.display : 'inline';
    element.setAttribute(ORIGINAL_DISPLAY_VALUE, displayValue);
    element.style.display = 'none';
    _configureClone(element);


    function _checkIfCloneExists() {
      /*jshint maxcomplexity:6 */
      var nextSibling = element.nextElementSibling;
      var previousSibling = element.previousElementSibling;
      if (element.getAttribute(IS_LINK_CLONE) === 'true') {
        return true;
      } else if (nextSibling && nextSibling.getAttribute(IS_LINK_CLONE) === 'true') {
        return true;
      } else if (previousSibling && previousSibling.getAttribute(IS_LINK_CLONE) === 'true') {
        return true;
      } else if (previousSibling && previousSibling.previousElementSibling && previousSibling.previousElementSibling.getAttribute(IS_LINK_CLONE) === 'true') {
        return true;
      } else if (nextSibling && nextSibling.nextElementSibling && nextSibling.nextElementSibling.getAttribute(IS_LINK_CLONE) === 'true') {
        return true;
      }
    }
  }

  function _handleClickOnLinkClone(event) {
    event.preventDefault();
    _addSelectedClassesToElement();
    console.log('InlineEdit: Opening edit dialog for the link element...');
    window.parent.postMessage({
      action: EDIT_LINK,
      contentId: event.currentTarget.getAttribute(CONTENT_ID),
      accessor: event.currentTarget.getAttribute(CONTENT_ACCESSOR),
      linkURL: event.currentTarget.getAttribute(LINK_URL),
      linkText: event.currentTarget.getAttribute(LINK_TEXT),
      linkDescription: event.currentTarget.getAttribute(LINK_DESCRIPTION)
    }, '*');

    function _addSelectedClassesToElement() {
      var editing = event.currentTarget.classList.contains(EDIT_ELEMENT_SELECTED_CLASS);
      if (!editing) {
        event.currentTarget.classList.add(EDIT_ELEMENT_SELECTED_CLASS);
        event.currentTarget.classList.add(EDIT_LINK_OVERRIDE_SELECTED_BACKGROUND_CLASS);
      }
    }
  }

  function _revertLink(element) {
    if (element.getAttribute(IS_LINK_CLONE) === 'true') {
      element.parentNode.removeChild(element);
    } else {
      element.style.display = element.getAttribute(ORIGINAL_DISPLAY_VALUE);
      element.removeAttribute(ORIGINAL_DISPLAY_VALUE);
      element.setAttribute(CONTENT_EDITABLE, false);
    }
  }

  function _configureClone(originalLink) {
    var cloneOfLink = originalLink.cloneNode(true);
    cloneOfLink.setAttribute(CONTENT_EDITABLE, 'false');
    _preventDuplicateIds();
    cloneOfLink.style.display = originalLink.getAttribute(ORIGINAL_DISPLAY_VALUE);
    cloneOfLink.setAttribute(IS_LINK_CLONE, 'true');
    originalLink.insertAdjacentElement('beforebegin', cloneOfLink);
    cloneOfLink.addEventListener('click', _handleClickOnLinkClone);
    if (cloneOfLink.innerHTML === '') {
      cloneOfLink.innerHTML = originalLink.getAttribute(LINK_TEXT);
    }

    function _preventDuplicateIds() {
      if (cloneOfLink.id) {
        cloneOfLink.id = cloneOfLink.id + '-' + IS_LINK_CLONE;
      }
    }
  }

  function _toggleTabIndex(_editMode) {
    var editableElements = window.document.querySelectorAll('[' + CONTENT_ACCESSOR + ']');
    for (var i = 0; i < editableElements.length; i++) {
      if (_editMode) {
        editableElements[i].setAttribute(TABINDEX, '0');
      } else {
        editableElements[i].removeAttribute(TABINDEX);
      }
    }
  }

  function _toggleEditClass() {
    if (editMode && window.document.body.classList) {
      window.document.body.classList.add(EDIT_MODE_CLASS);
    } else {
      window.document.body.classList.remove(EDIT_MODE_CLASS);
    }
  }

  function _getTargetDomTop(contentId, element) {
    var targetDom = _findTargetDom(contentId, element);
    if (targetDom) {
      return window.pageYOffset + targetDom.getBoundingClientRect().top;
    } else {
      return 0;
    }
  }

  function _findTargetDom(contentId, element) {
    var targetDom;
    var contentSelector = '[wch-content-id=\"' + contentId + '\"]';
    var elementSelector = '[wch-content-key=\"' + element.key + '\"]';
    var multiValueElement = window.document.querySelectorAll(contentSelector + elementSelector);
    if (multiValueElement) {
      targetDom = multiValueElement[element.entry ? element.entry : 0];
    }
    return targetDom;
  }

  function _smoothScrollToTargetDom(msg) {
    var contentId = msg.data.contentId;
    var targetElement = msg.data.element;
    var duration = 1000;
    var startTop = window.pageYOffset;
    var targetDomTop = _getTargetDomTop(contentId, targetElement);
    if (targetDomTop === 0) {
      return;
    }
    // If element is close to page's bottom then window will scroll only to some position above the element.
    if ((window.document.body.scrollHeight - targetDomTop) < window.innerHeight) {
      targetDomTop = window.document.body.scrollHeight - window.innerHeight;
    }
    var scrollHeightDifference = targetDomTop - startTop;
    if (scrollHeightDifference === 0) {
      return;
    }
    var start;
    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(_step);

    function _step(timestamp) {
      if (!start) {
        start = timestamp;
      }
      // Elapsed miliseconds since start of scrolling.
      var time = timestamp - start;
      // Get percent of completion in range [0, 1]. 1 could be changed based on the offset we need in the top
      var percent = Math.min(time / duration, 1);
      window.scrollTo(0, startTop + scrollHeightDifference * percent);
      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(_step);
      }
    }
  }

  function createMediaButtons(container, element) {
    container.innerHTML += OPEN_PALETTE_BUTTON;
    var paletteButton = container.querySelector(PALETTE_BUTTON_CLASS_SELECTOR);
    addPaletteButtonAttributes(paletteButton, element);
  }

  function addPaletteButtonAttributes(paletteButton, element) {
    paletteButton.addEventListener('click', _openPalette);
    paletteButton.setAttribute(CONTENT_ID, element.getAttribute(CONTENT_ID));
    paletteButton.setAttribute(CONTENT_KEY, element.getAttribute(CONTENT_KEY));
    paletteButton.setAttribute(PALETTE_TYPE, element.getAttribute(CONTENT_TYPE));
    paletteButton.setAttribute(CONTENT_ACCESSOR, element.getAttribute(CONTENT_ACCESSOR));
  }

  function createMediaWrapper() {
    var wrapperdiv = window.document.createElement('div');
    wrapperdiv.classList.add(MEDIA_BANNER_WRAPPER_CLASS);
    return wrapperdiv;
  }

  function _addMediaButtons(element) {
    var bannerElement = element.parentNode.querySelector(MEDIA_BANNER_CLASS_SELECTOR);
    if (!bannerElement) {
      var mediaWrapper = createMediaWrapper();
      var bannerContainer = createMediaBannerContainer();
      createMediaButtons(bannerContainer.firstElementChild, element);
      element.parentNode.insertBefore(mediaWrapper, element);
      mediaWrapper.appendChild(bannerContainer, element);
      mediaWrapper.appendChild(element);
      element.classList.add(CONTENT_BORDER_CLASS);
    } else {
      var paletteButton = bannerElement.querySelector(PALETTE_BUTTON_CLASS_SELECTOR);
      if (paletteButton) {
        addPaletteButtonAttributes(paletteButton, element);
      }
    }
  }

  function _addBanner( /* jshint maxparams: 6 */ element, id, name, key, type, draftStatus) {
    _addRegionRoleToContainer(element, name);
    var bannerElement;
    var wrapperSpan;
    var wrapperDiv;
    if (type === PAGE) {
      bannerElement = element.querySelector(PAGE_SELECTOR);
    } else {
      bannerElement = element.querySelector(CONTENT_BANNER_CLASS_SELECTOR);
    }
    if (bannerElement) {
      _updateBanner();
    } else {
      _createBanner();
    }

    function _updateBanner() {
      var buttonSpans = bannerElement.querySelectorAll('[' + CONTENT_ID + ']');
      for (var i = 0; i < buttonSpans.length; i++) {
        setButtonAttributes(buttonSpans[i]);
      }
      var bannerName = element.querySelector(CONTENT_BANNER_NAME_CLASS_SELECTOR);
      bannerName.title = name;
      bannerName.innerHTML = name;

      _chooseEditButton(bannerElement);
    }

    function _createBanner() {
      wrapperDiv = createWrapperDiv();
      wrapperSpan = createWrapperSpan();
      _addEditButtons();
      if (sitesApprovalToggleEnabled) {
        _addCommentsButton();
      }
      if (draftStatus === IN_REVIEW && sitesApprovalToggleEnabled) {
        _addApprovalButton();
      }
      if (type === CONTENT_TYPE_REF) {
        _addRefLabel();
        _addContentName();
        _addContentBanner();
      } else if (type === PAGE) {
        _addPageIcon();
        _addContentName();
        element.insertBefore(wrapperSpan, element.firstChild);
        element.classList.add(CONTENT_BORDER_CLASS);
        element.firstChild.classList.add(PAGE_CLASS);
        element.firstChild.setAttribute(CONTENT_REVIEW, true);
      }
    }

    function _addEditButtons() {
      _addEditorButton();
      _addLockedButton();
      _chooseEditButton(wrapperSpan);
    }

    function _chooseEditButton(bannerElement) {
      if (draftStatus === APPROVED && !bannerElement.classList.contains(LOCKED_ICON_CLASS)) {
        bannerElement.classList.add(LOCKED_ICON_CLASS);
      }
      if (draftStatus !== APPROVED) {
        bannerElement.classList.remove(LOCKED_ICON_CLASS);
      }
    }

    function createWrapperSpan() {
      var wrapperSpan = window.document.createElement('span');
      wrapperSpan.className = CONTENT_BANNER_CLASS;
      return wrapperSpan;
    }

    function createWrapperDiv() {
      var wrapperDiv = window.document.createElement('div');
      return wrapperDiv;
    }

    function _addContentBanner() {
      if (element && element.firstChild) {
        wrapperDiv.appendChild(wrapperSpan);
        element.insertBefore(wrapperDiv, element.firstChild);
        element.classList.add(CONTENT_BORDER_CLASS);
        element.classList.add(CONTENT_BANNER_CONTAINER_CLASS);
      }
    }

    function _addEditorButton() {
      var toggleButtonSpan = createEditorButton();
      toggleButtonSpan.addEventListener('click', _openEditor);
      setButtonAttributes(toggleButtonSpan);
      wrapperSpan.appendChild(toggleButtonSpan);
    }

    function _addCommentsButton() {
      var commentButtonSpan = createCommentsButton();
      commentButtonSpan.addEventListener('click', _openComments);
      setButtonAttributes(commentButtonSpan);
      wrapperSpan.appendChild(commentButtonSpan);
    }

    function _addApprovalButton() {
      var approvalButtonSpan = window.document.createElement('span');
      approvalButtonSpan.innerHTML = APPROVAL_BUTTON;
      approvalButtonSpan.addEventListener('click', _approve);
      setButtonAttributes(approvalButtonSpan);
      wrapperSpan.appendChild(approvalButtonSpan);
    }

    function _addLockedButton() {
      var lockButtonSpan = window.document.createElement('span');
      lockButtonSpan.innerHTML = LOCK_BUTTON;
      lockButtonSpan.addEventListener('click', _unlock);
      setButtonAttributes(lockButtonSpan);
      wrapperSpan.appendChild(lockButtonSpan);
    }

    function _addRefLabel() {
      var refSpan = window.document.createElement('span');
      refSpan.setAttribute('aria-label', CONTENT_REF_MARKER);
      refSpan.innerHTML = CONTENT_REF_MARKER;
      refSpan.classList.add(CONTENT_REF_CLASS);
      wrapperSpan.appendChild(refSpan);
    }

    function _addContentName() {
      var bannerNameSpan = createNameSpan(name);
      wrapperSpan.appendChild(bannerNameSpan);
    }

    function _addPageIcon() {
      var icon = createPageIcon();
      wrapperSpan.appendChild(icon);
    }

    function createEditorButton() {
      var toggleButtonSpan = window.document.createElement('span');
      toggleButtonSpan.innerHTML = TOGGLE_EDIT_BUTTON;
      return toggleButtonSpan;
    }

    function createNameSpan(name) {
      var bannerNameSpan = window.document.createElement('span');
      bannerNameSpan.className = CONTENT_BANNER_NAME_CLASS;
      bannerNameSpan.innerHTML = name;
      bannerNameSpan.title = name;
      return bannerNameSpan;
    }

    function setButtonAttributes(button) {
      button.setAttribute(CONTENT_ID, id);
      button.setAttribute(CONTENT_KEY, key);
      button.setAttribute(CONTENT_NAME, name);
    }

    function createCommentsButton() {
      var commentButtonSpan = window.document.createElement('span');
      commentButtonSpan.innerHTML = SHOW_COMMENTS_BUTTON;
      return commentButtonSpan;
    }

    function createPageIcon() {
      var pageSpan = window.document.createElement('span');
      pageSpan.className = 'page-icon';
      var pageSpanMarkup = PAGE_ICON;
      pageSpan.innerHTML = pageSpanMarkup;
      return pageSpan;
    }
  }

  function _addRegionRoleToContainer(element, name) {
    element.setAttribute('role', 'region');
    element.setAttribute('aria-label', name);
  }

  function createMediaBannerContainer() {
    var bannerSpan = window.document.createElement('span');
    var relativeSpan = window.document.createElement('span');
    relativeSpan.className = MEDIA_BANNER_CONTAINER;
    relativeSpan.appendChild(bannerSpan);
    bannerSpan.className = IMAGE_BANNER_CLASS;
    return relativeSpan;
  }

  function _openEditor(event) {
    event.preventDefault();
    event.stopPropagation();
    _sendOpenEditorMessage(event.currentTarget.getAttribute(CONTENT_ID), event.currentTarget.getAttribute(CONTENT_NAME));
  }

  function _openComments(event) {
    event.preventDefault();
    event.stopPropagation();
    _sendOpenEditorMessage(event.currentTarget.getAttribute(CONTENT_ID), event.currentTarget.getAttribute(CONTENT_NAME), COMMENTS);
  }

  function _approve(event) {
    event.preventDefault();
    event.stopPropagation();
    _sendApproveMessage(event.currentTarget.getAttribute(CONTENT_ID), event.currentTarget.getAttribute(CONTENT_NAME));
  }

  function _unlock(event) {
    event.preventDefault();
    event.stopPropagation();
    _sendUnlockMessage(event.currentTarget.getAttribute(CONTENT_ID), event.currentTarget.getAttribute(CONTENT_NAME));
  }

  function _sendOpenEditorMessage(contentId, contentName, contentView) {
    window.parent.postMessage({
      action: OPEN_EDITOR,
      contentId: contentId,
      contentName: contentName,
      view: contentView
    }, '*');
    console.log('InlineEdit: Sent open editor event');
  }

  function _openPalette(event) {
    _removeActivePaletteState();
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.disabled = true;
    event.currentTarget.setAttribute(PALETTE_BUTTON_ACTIVE, '');
    _sendOpenPaletteMessage(event.currentTarget.getAttribute(CONTENT_ID), event.currentTarget.getAttribute(CONTENT_KEY),
      event.currentTarget.getAttribute(PALETTE_TYPE), event.currentTarget.getAttribute(CONTENT_ACCESSOR));
  }

  function _sendOpenPaletteMessage(contentId, key, assetType, accessor) {
    window.parent.postMessage({
      action: OPEN_PALETTE,
      contentId: contentId,
      key: key,
      assetType: assetType,
      accessor: accessor
    }, '*');
    console.log('InlineEdit: Sent open palette event');
  }

  function _sendApproveMessage(contentId, contentName) {
    window.parent.postMessage({
      action: APPROVE,
      contentId: contentId,
      contentName: contentName
    }, '*');
    console.log('InlineEdit: Sent approve event');
  }

  function _sendUnlockMessage(contentId, contentName) {
    window.parent.postMessage({
      action: UNLOCK,
      contentId: contentId,
      contentName: contentName
    }, '*');
    console.log('InlineEdit: Sent unlock event');
  }

  function _sendHighlightMessage(event, forceOpen) {
    var element = event.currentTarget;
    var accessor = element.getAttribute(CONTENT_ACCESSOR);
    var elementKey = _extractElementKey(accessor);
    var elementData;
    var entryValue = _extractMultiValueIndex(accessor);
    if (entryValue !== undefined) {
      elementData = [{
        key: elementKey,
        entry: entryValue
      }];
    } else {
      elementData = [{
        key: elementKey
      }];
    }
    window.parent.postMessage({
      action: ELEMENT_HIGHLIGHT,
      contentId: element.getAttribute(CONTENT_ID),
      contentName: element.getAttribute(CONTENT_NAME),
      element: elementData,
      forceOpen: forceOpen ? true : false
    }, '*');

    console.log('InlineEdit: Sent element highlight event');
  }

  function _setEditMode(isEditMode) {
    editMode = isEditMode;
  }

  function _setInlineEditTranslation(isInlineEditTranslation) {
    inlineEditTranslation = isInlineEditTranslation;
  }

  function _setSitesApprovalsToggleEnabled(isContentRefEnabled) {
    sitesApprovalToggleEnabled = isContentRefEnabled;
  }


  return {'register': registerComponentForEditing  };

}());