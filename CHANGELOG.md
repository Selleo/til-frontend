<a name="unreleased"></a>
## [Unreleased]

### Chore
- Update github workflow with shared ECS cluster


<a name="v0.1.4"></a>
## [v0.1.4] - 2023-08-01
### Chore
- Update cluster
- Update API URL
- Update cluster ID


<a name="v0.1.3"></a>
## [v0.1.3] - 2023-03-17

<a name="v0.1.2"></a>
## [v0.1.2] - 2023-03-16

<a name="v0.1.1"></a>
## [v0.1.1] - 2023-01-31
### Chore
- Fix image tag for GA


<a name="v0.1.0"></a>
## v0.1.0 - 2023-01-31
### Add
- frontend jwt authentication
- syntax-highlighting
- preview component
- post component
- post sorted descendingly
- redirect after saving a post

### Chore
- Prod deployment
- Disable migration because of RPC
- Add migrate step
- Update runtime for elixir
- Fix eslint warnings
- Update browser list
- Fix pipeline branch trigger
- Update dockerfile and entrypoint
- Move workflows to valid folder
- Add gitignore, remove duplicated tool-versions
- Add frontend setup
- Add /healthcheck endpoint
- Bump deps
- Migrate to releases for production deployment ([#82](https://github.com/Selleo/til/issues/82))
- Dockerfile/entrypoint.sh updated
- verions bumb
- more space from app header to content
- change assets path
- add homepage property to package.json
- remove unused css debugging tool
- Setup redirects for react routing
- Setup netlify config
- Setup ESLint, Prettier & Airbnb Style Guide

### Css
- review button
- add icons
- refactor styled components into pure BEM SASS
- reaction icons
- syntax highlight change
- checkbox color fix
- placeholders
- edit post
- add post buttons
- checkboxes
- add post layout
- fix login aligment
- unauthenticated layout
- search bar fix
- new layout
- post

### Feat
- update user on login ([#116](https://github.com/Selleo/til/issues/116))
- Add slug for post url ([#90](https://github.com/Selleo/til/issues/90)) ([#107](https://github.com/Selleo/til/issues/107))
- [BE] adds username and remote uuid ([#84](https://github.com/Selleo/til/issues/84))
- callbackURL on auth
- log in first for review post
- info post is public or private
- edit button on post list for post onwer
- tooltip delay on share post
- adds state to allow pass custom redirect url param
- remove redundant show and nest in post category view
- customizes post unique title error message
- adds position to categories in posts
- callbackURL on auth
- log in first for review post
- info post is public or private
- edit button on post list for post onwer
- tooltip delay on share post
- adds state to allow pass custom redirect url param
- remove redundant show and nest in post category view
- customizes post unique title error message
- adds position to categories in posts
- text for banner from BE
- post banner
- action modal
- more categories fix: review view
- elastic transition component
- add icons and hamburger positioning
- back to top categories on click home
- logo in app header
- hamburger
- rwd post, main-content, edit-add
- rwd home
- scrolling to current active category
- hook that allow notify user and disable some elements
- share button with tooltip
- tooltip with seo links
- reactions hover state
- adds url to categories and modify seeds ([#50](https://github.com/Selleo/til/issues/50))
- user post list
- display posts by category

### Fix
- Unable to copy or go to link from post card ([#155](https://github.com/Selleo/til/issues/155))
- fix initial redirect
- conflict with copy of url ([#134](https://github.com/Selleo/til/issues/134))
- read the month correctly ([#128](https://github.com/Selleo/til/issues/128))
- show reactions count for unathenticated users
- fix wrong reactions url
- fix search ([#118](https://github.com/Selleo/til/issues/118))
- Slugify title in migration dump
- 🤦 enable server in production
- modal categories || style: changes from mockup
- error handling on postBanner
- not found post
- encode redirect url
- apply feedback
- modal categories || style: changes from mockup
- error handling on postBanner
- not found post
- encode redirect url
- apply feedback
- refreshing page cause by input
- app test caused by react-modal (react-portal)
- empty post list on single category page when  refresh
- empty search results on refresh
- bugs after merging
- remove share/reactions on post preview/review
- remove share button on livepreview
- disable some elements based on route
- disable some elements base on route
- search highlight
- add post select input color
- sort categories
- remove box shadow from clickable elements
- correct categories api endpoint
- remove unreachable code
- display post for review
- profile post list updated after edit or add
- changes from css_app_header applied
- changes as requested
- setButtonState changes properly
- configure IDE to add end of file line automatically

### Pagination
- fix for categories ([#150](https://github.com/Selleo/til/issues/150))

### Refactor
- add fragments in some post components
- changes as requested
- requested changes

### Style
- new reaction icons
- error toast message
- new reaction icons
- error toast message
- stretch reactions beetwen sm and md
- logo in appheader
- export social media to files and map in footer
- corrects after pr
- adding boilerplate and fixing styles


[Unreleased]: https://github.com/Selleo/til/compare/v0.1.4...HEAD
[v0.1.4]: https://github.com/Selleo/til/compare/v0.1.3...v0.1.4
[v0.1.3]: https://github.com/Selleo/til/compare/v0.1.2...v0.1.3
[v0.1.2]: https://github.com/Selleo/til/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/Selleo/til/compare/v0.1.0...v0.1.1
