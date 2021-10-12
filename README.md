# clothing-crawler
쇼핑몰별 크롤러(오픈소스)


- 무신사/29cm에서 쇼핑몰별 상품 정보와 품절 여부를 확인할 수 있는 API를 제공합니다
- 다음과 같이 구현할 예정입니다 (아직 미구현)
```typescript
// 무신사 특정 상품 ID로 긁어오기기
crawlProductById(Malls.MUSINSA, productId);
// 무신사 특정 상품이 품절 여부인지 확인하기
checkIsProductOutOfStockById(Malls.MUSINSA, productId);
```
