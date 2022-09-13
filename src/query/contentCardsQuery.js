import {gql} from '@apollo/client';

const LIST = gql`
  query contentCards($keywords: String, $offset: Int, $limit: Int) {
    contentCards(
      filter: {
        limit: $limit
        offset: $offset
        keywords: $keywords
        types: [PODCAST]
      }
    ) {
      edges {
        ... on Podcast {
          name
          preamble
          image {
            ...Image
          }
          categories {
            ...Category
          }
          experts {
            ...Expert
          }
        }
      }
      meta {
        total
        limit
        offset
      }
    }
  }

  fragment Image on Image {
    uri
  }

  fragment Category on Category {
    name
  }

  fragment Expert on Expert {
    firstName
    lastName
    title
    company
  }
`;

export default LIST;
