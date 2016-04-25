Api for online strategic game. Very online, very strategic!

##Creating database

#users:

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `uname` text CHARACTER SET latin1 NOT NULL,
  `upass` text CHARACTER SET latin1 NOT NULL,
  `umail` text CHARACTER SET latin1 NOT NULL,
  `reg_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uname` (`uname`(31));
  
  ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
  
#bases:

CREATE TABLE `bases` (
  `id` int(11) UNSIGNED NOT NULL,
  `x` bigint(20) NOT NULL,
  `y` bigint(20) NOT NULL,
  `rescount` text COLLATE utf8_bin NOT NULL,
  `base` text COLLATE utf8_bin NOT NULL,
  `res_update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

ALTER TABLE `bases`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `x` (`x`),
  ADD UNIQUE KEY `y` (`y`),
  ADD KEY `position` (`x`,`y`);
