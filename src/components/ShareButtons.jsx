import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';

const ShareButtons = ({ url, title }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Share:
      </span>
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <RedditShareButton url={shareUrl} title={title}>
        <RedditIcon size={32} round />
      </RedditShareButton>
    </div>
  );
};

export default ShareButtons;
