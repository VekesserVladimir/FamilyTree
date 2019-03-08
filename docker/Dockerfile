FROM mcr.microsoft.com/dotnet/core/sdk:2.2 as build
WORKDIR /app
COPY ./src ./
RUN dotnet publish FamilyTree.Web -o /app/build -c Release

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-alpine
WORKDIR /app
COPY --from=build /app/build ./
EXPOSE 80
CMD ["dotnet", "FamilyTree.Web.dll"]