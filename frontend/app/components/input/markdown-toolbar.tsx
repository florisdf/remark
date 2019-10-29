/** @jsx h */
import { h, Component, RenderableProps } from 'preact';
import '@github/markdown-toolbar-element';
import BoldIcon from './markdown-toolbar-icons/bold-icon';
import ItalicIcon from './markdown-toolbar-icons/italic-icon';
import LinkIcon from './markdown-toolbar-icons/link-icon';
import ImageIcon from './markdown-toolbar-icons/image-icon';
import UnorderedListIcon from './markdown-toolbar-icons/unordered-list-icon';
import OrderedListIcon from './markdown-toolbar-icons/ordered-list-icon';

interface Props {
  textareaId: string;
  uploadImages: (files: File[]) => Promise<void>;
  allowUpload: boolean;
}

interface FileEventTarget extends EventTarget {
  readonly files: FileList | null;
  value: string | null;
}

interface FileInputEvent extends Event {
  readonly currentTarget: FileEventTarget | null;
}

const boldLabel = 'Vetgedrukt';
const italicLabel = 'Cursief';
const linkLabel = 'Link';
const unorderedListLabel = 'Opsommingstekens';
const orderedListLabel = 'Nummering';
const attachImageLabel = 'Afbeelding';

export default class MarkdownToolbar extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.uploadImages = this.uploadImages.bind(this);
  }
  async uploadImages(e: Event) {
    const currentTarget = (e as FileInputEvent).currentTarget;
    if (!(this.props.allowUpload && currentTarget && currentTarget.files && currentTarget.files.length !== 0)) return;
    const files = Array.from(currentTarget.files);
    await this.props.uploadImages(files);
    currentTarget.value = null;
  }
  render(props: RenderableProps<Props>) {
    return (
      <markdown-toolbar className="input__toolbar" for={props.textareaId}>
        <div className="input__toolbar-group">
          <md-bold className="input__toolbar-item" title={boldLabel} aria-label={boldLabel}>
            <BoldIcon />
          </md-bold>
          <md-italic className="input__toolbar-item" title={italicLabel} aria-label={italicLabel}>
            <ItalicIcon />
          </md-italic>
        </div>
        <div className="input__toolbar-group">
          <md-link className="input__toolbar-item" title={linkLabel} aria-label={linkLabel}>
            <LinkIcon />
          </md-link>
          {this.props.allowUpload ? (
            <label className="input__toolbar-item" title={attachImageLabel} aria-label={attachImageLabel}>
              <input multiple class="input__toolbar-file-input" type="file" onChange={this.uploadImages} />
              <ImageIcon />
            </label>
          ) : null}
        </div>
        <div className="input__toolbar-group">
          <md-unordered-list className="input__toolbar-item" title={unorderedListLabel} aria-label={unorderedListLabel}>
            <UnorderedListIcon />
          </md-unordered-list>
          <md-ordered-list className="input__toolbar-item" title={orderedListLabel} aria-label={orderedListLabel}>
            <OrderedListIcon />
          </md-ordered-list>
        </div>
      </markdown-toolbar>
    );
  }
}
