// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Config } from 'stellate';

const config: Config = {
  config: {
    name: 'damien',
    blockIntrospection: true,
    partialQueryCaching: {
      enabled: true,
    },
    mutationPolicy: 'Entity',
    scopes: {
      AUTHENTICATED: 'header:authorization|header:sessionauthorization',
    },
    rootTypeNames: {
      query: 'Query',
      mutation: 'Mutation',
    },
    keyFields: {
      types: {
        User: ['id', 'username'],
        Brand: ['id', 'slug'],
        Story: ['id', 'slug'],
      },
    },
    rules: [
      {
        types: {
          ReviewSummary: [
            'id',
            'brandId',
            'popularTags',
            'ratingsCount',
            'averageRating',
            'ratingDistribution',
            'wouldRecommendPercent',
          ],
        },
        maxAge: 86400,
        swr: 31536000,
        description: 'ReviewSummary - brandId, id, averageRating, and 4 more',
      },
      {
        types: {
          Brand: [
            'milestones',
            'campaignBuyAt',
            'reviewSummary',
            'reviewAiSummary',
            'campaignLinkPath',
            'campaignImagePath',
            'campaignPillLabel',
            'campaignTitleLong',
            'campaignTitleShort',
          ],
        },
        maxAge: 86400,
        swr: 31536000,
        description:
          'Brand - reviewSummary, milestones, reviewAiSummary, and 6 more',
      },
      {
        types: {
          Brand: [
            'slug',
            'tags',
            'rooms',
            'title',
            'people',
            'webUrl',
            'addedBy',
            'company',
            'reviews',
            'shipsTo',
            'stories',
            'keywords',
            'categories',
            'isPromoted',
            'categoryIds',
            'description',
            'publishedAt',
            'slugHistory',
            'assetsFolder',
            'categoryTags',
            'demographics',
            'internalTags',
            'productDrops',
            'webUrlDomain',
            'subcategories',
            'primaryCategory',
            'secondaryImages',
            'productCampaigns',
            'impactInitiatives',
            'primaryCategoryId',
            'secondaryImageIds',
            'alternativeWebUrls',
            'instagramReviewUrl',
            'lastContributionAt',
            'primaryImageCredit',
            'descriptionFromBrand',
            'primaryImageFullPath',
            'primaryImageUploaderType',
            'primaryImageProminentColorHex',
          ],
        },
        maxAge: 2592000,
        swr: 31536000,
        description: 'Brand - addedBy, title, slug, and 36 more',
      },
      {
        types: {
          Brand: ['rip', 'status', 'reviewableProducts'],
        },
        maxAge: 3600,
        swr: 2592000,
        description: 'Brand - status, rip, reviewableProducts',
      },
      {
        types: {
          Brand: ['claimed'],
        },
        maxAge: 3600,
        swr: 2592000,
        scope: 'AUTHENTICATED',
        description: 'Brand - claimed',
      },
      {
        types: {
          BrandsResponse: ['items', 'total', 'hasMore', 'queryID', 'nextSkip'],
        },
        maxAge: 3600,
        swr: 2592000,
        description: 'BrandsResponse - items, total, hasMore, and 2 more',
      },
      {
        types: {
          RelatedBrandsResponse: [
            'items',
            'total',
            'hasMore',
            'category',
            'nextSkip',
          ],
        },
        maxAge: 3600,
        swr: 2592000,
        description:
          'RelatedBrandsResponse - items, total, hasMore, and 2 more',
      },
      {
        types: {
          Brand: ['myReview'],
        },
        maxAge: 86400,
        swr: 2592000,
        scope: 'AUTHENTICATED',
        description: 'Brand - myReview',
      },
      {
        types: {
          Brand: ['relatedBrands'],
        },
        maxAge: 1800,
        swr: 2592000,
        description: 'Brand - relatedBrands',
      },
    ],
    nonCacheable: ['Query'],
    requestSigning: {
      secret: 'secret',
    },
  },
};
export default config;
